function nocontext(e) {

    wccp_pro_log_to_console_if_allowed("function", "nocontext");

    e = e || window.event;
    // also there is no e.target property in IE. instead IE uses window.event.srcElement

    if (apply_class_exclusion(e) == 'Yes')
        return true;

    var exception_tags = 'NOTAG,';

    var clickedTag = (e == null) ? event.srcElement.tagName : e.target.tagName;

    //console.log("clickedTag: " + clickedTag);

    var target = e.target || e.srcElement;

    var parent_tag = "";
    var parent_of_parent_tag = "";

    if (target.parentElement != null) {
        parent_tag = target.parentElement.tagName;

        if (target.parentElement.parentElement != null)
            parent_of_parent_tag = target.parentElement.parentElement.tagName;
    }

    var checker = 'checked';
    if ((clickedTag == "IMG" || clickedTag == "FIGURE" || clickedTag == "SVG" || clickedTag == "PROTECTEDIMGDIV") && checker == 'checked') {
        if (alertMsg_IMG != "")
            show_wccp_pro_message(alertMsg_IMG);
        return false;
    } else {
        exception_tags = exception_tags + 'IMG,';
    }

    checker = 'checked';
    if ((clickedTag == "VIDEO" || clickedTag == "PROTECTEDWCCPVIDEO" || clickedTag == "EMBED") && checker == 'checked') {
        if (alertMsg_VIDEO != "")
            show_wccp_pro_message(alertMsg_VIDEO);
        return false;
    } else {
        exception_tags = exception_tags + 'VIDEO,PROTECTEDWCCPVIDEO,EMBED,';
    }

    checker = 'checked';
    if ((clickedTag == "A" || clickedTag == "TIME" || parent_tag == "A" || parent_of_parent_tag == "A") && checker == 'checked') {
        if (alertMsg_A != "")
            show_wccp_pro_message(alertMsg_A);
        return false;
    } else {
        exception_tags = exception_tags + 'A,';
        if (parent_tag == "A" || parent_of_parent_tag == "A")
            clickedTag = "A";
    }

    checker = 'checked';
    if ((clickedTag == "P" || clickedTag == "B" || clickedTag == "FONT" || clickedTag == "LI" || clickedTag == "UL" || clickedTag == "STRONG" || clickedTag == "OL" || clickedTag == "BLOCKQUOTE" || clickedTag == "TH" || clickedTag == "TR" || clickedTag == "TD" || clickedTag == "SPAN" || clickedTag == "EM" || clickedTag == "SMALL" || clickedTag == "I" || clickedTag == "BUTTON") && checker == 'checked') {
        if (alertMsg_PB != "")
            show_wccp_pro_message(alertMsg_PB);
        return false;
    } else {
        exception_tags = exception_tags + 'P,B,FONT,LI,UL,STRONG,OL,BLOCKQUOTE,TD,SPAN,EM,SMALL,I,BUTTON,';
    }

    checker = 'checked';
    if ((clickedTag == "INPUT" || clickedTag == "PASSWORD") && checker == 'checked') {
        if (alertMsg_INPUT != "")
            show_wccp_pro_message(alertMsg_INPUT);
        return false;
    } else {
        exception_tags = exception_tags + 'INPUT,PASSWORD,';
    }

    checker = 'checked';
    if ((clickedTag == "H1" || clickedTag == "H2" || clickedTag == "H3" || clickedTag == "H4" || clickedTag == "H5" || clickedTag == "H6" || clickedTag == "ASIDE" || clickedTag == "NAV") && checker == 'checked') {
        if (alertMsg_H != "")
            show_wccp_pro_message(alertMsg_H);
        return false;
    } else {
        exception_tags = exception_tags + 'H1,H2,H3,H4,H5,H6,';
    }

    checker = '';
    if (clickedTag == "TEXTAREA" && checker == 'checked') {
        if (alertMsg_TEXTAREA != "")
            show_wccp_pro_message(alertMsg_TEXTAREA);
        return false;
    } else {
        exception_tags = exception_tags + 'TEXTAREA,';
    }

    checker = 'checked';
    if ((clickedTag == "DIV" || clickedTag == "BODY" || clickedTag == "HTML" || clickedTag == "ARTICLE" || clickedTag == "SECTION" || clickedTag == "NAV" || clickedTag == "HEADER" || clickedTag == "FOOTER") && checker == 'checked') {
        if (alertMsg_EmptySpaces != "")
            show_wccp_pro_message(alertMsg_EmptySpaces);
        return false;
    } else {
        if (exception_tags.indexOf(clickedTag) != -1) {
            return true;
        } else
            return false;
    }
}

function disable_drag_images(e) {
    wccp_pro_log_to_console_if_allowed("function", "disable_drag_images");

    var e = e || window.event;
    // also there is no e.target property in IE. instead IE uses window.event.srcElement

    var target = e.target || e.srcElement;

    //For contenteditable tags
    if (apply_class_exclusion(e) == "Yes")
        return true;

    var elemtype = e.target.nodeName;

    if (elemtype != "IMG") {
        return;
    }

    elemtype = elemtype.toUpperCase();

    var disable_drag_drop_images = 'checked';

    if (disable_drag_drop_images != "checked")
        return true;

    if (window.location.href.indexOf("/user/") > -1) {
        return true;
        //To allow users to drag & drop images when editing thier profiles
    }

    show_wccp_pro_message(alertMsg_IMG);

    return false;
}

var alertMsg_IMG = "";
var alertMsg_A = "";
var alertMsg_PB = "";
var alertMsg_INPUT = "";
var alertMsg_H = "";
var alertMsg_TEXTAREA = "";
var alertMsg_EmptySpaces = "";
var alertMsg_VIDEO = "";
document.oncontextmenu = null;
document.oncontextmenu = nocontext;
document.addEventListener("contextmenu", nocontext);
window.addEventListener("contextmenu", nocontext);

document.ondragstart = disable_drag_images;
jQuery(document).ready(function() {
    jQuery('img').each(function() {
        jQuery(this).attr('draggable', false);
    });
});

function wccp_pro_msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE");
    var msie2 = ua.indexOf("Edge");
    var msie3 = ua.indexOf("Trident");

    if (msie > -1 || msie2 > -1 || msie3 > -1) // If Internet Explorer, return version number
    {
        return "IE";
    } else // If another browser, return 0
    {
        return "otherbrowser";
    }
}

var e = document.getElementsByTagName('H1')[0];
if (e && wccp_pro_msieversion() == "IE") {
    e.setAttribute('unselectable', "on");
}

function play_stop_video(ev, period=1000) {
    wccp_pro_log_to_console_if_allowed("function", "play_stop_video");

    jQuery('Protectedwccpvideo').addClass("pointer_events_none");

    setTimeout(function() {
        jQuery('Protectedwccpvideo').removeClass("pointer_events_none");
    }, period);
}

function isEventSupported(eventName) {
    wccp_pro_log_to_console_if_allowed("function", "isEventSupported");

    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
}

jQuery(document).ready(function() {
    wccp_pro_log_to_console_if_allowed("function", "wheelEvent");

    // Check which wheel event is supported. Don't use both as it would fire each event 
    // in browsers where both events are supported.
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';

    // Now bind the event to the desired element
    jQuery('body').on("mousewheel", function(e) {
        var oEvent = e.originalEvent
          , delta = oEvent.deltaY || oEvent.wheelDelta;
        play_stop_video(this, 1000);
    });

    jQuery('iframe').wrap('<div class="video-wrap-div"></div>');

    var load_once = false;

    if (!load_once) {
        jQuery("iframe").after('<Protectedwccpvideo onclick="play_stop_video(this,1000)" class="protected_video_class"><div onmousemove="play_stop_video(this,100)" onclick="play_stop_video(this,1000)" class="Protectedwccpvideomiddle_class"></div></Protectedwccpvideo>');
        load_once = true;
    }
    //Allow pdf and doc files
    try {
        jQuery('iframe[src*="officeapps"], iframe[src*="docs"],iframe[src*=".pdf"],iframe[src*=".docx"],iframe[src*=".pptx"]').unwrap('<div class="video-wrap-div"></div>');
    } catch (err) {//nothing to do
    }
});

function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_wccp_pro_hiddenCopyText_";
    {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }

    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    // clear temporary content
    target.textContent = "";
    document.getElementsByTagName('span')[0].innerHTML = " ";
    return succeed;
}
/**************************************************/
function wccp_pro_log_to_console_if_allowed(title="title", data="") {
    var myName = "";

    if (wccp_pro_log_to_console_if_allowed.caller != null)
        myName = wccp_pro_log_to_console_if_allowed.caller.toString();

    myName = myName.substr('function '.length);

    myName = myName.substr(0, myName.indexOf('('));

    //console.log("function_name: " + myName);

}
/**************************************************/
function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
}
/*****************************************/
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log("Async: Copying to clipboard was successful!");
    }, function(err) {
        console.error("Async: Could not copy text: ", err);
    });
}
/*****************************************/
/*getSelectionTextAndContainerElement*/
function getSelectionTextAndContainerElement() {
    var text = ""
      , containerElement = null;
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var node = sel.getRangeAt(0).commonAncestorContainer;
            containerElement = node.nodeType == 1 ? node : node.parentNode;
            if (typeof (containerElement.parentElement) != 'undefined')
                current_clicked_object = containerElement.parentElement;
            text = sel.toString();
        }
    } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
        var textRange = document.selection.createRange();
        containerElement = textRange.parentElement();
        text = textRange.text;
    }

    return {
        text: text,
        containerElement: containerElement
    };
}

function getSelectionParentElement() {
    var parentEl = null, sel;

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            //sel.getRangeAt(0).startContainer.parentNode;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ((sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }

    let arr = new Array();

    arr["nodeName"] = "cant_find_parent_element";

    if (parentEl != null)
        return parentEl;
    else
        return arr;
}
/*****************************************/
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/*****************************************/

 function copyToClipboard(elem) {
                // create hidden text element, if it doesn't already exist
                var targetId = "_wccp_pro_hiddenCopyText_";
                {
                    // must use a temporary form element for the selection and copy
                    target = document.getElementById(targetId);
                    if (!target) {
                        var target = document.createElement("textarea");
                        target.style.position = "absolute";
                        target.style.left = "-9999px";
                        target.style.top = "0";
                        target.id = targetId;
                        document.body.appendChild(target);
                    }
                    target.textContent = elem.textContent;
                }
                // select the content
                var currentFocus = document.activeElement;
                target.focus();
                target.setSelectionRange(0, target.value.length);

                // copy the selection
                var succeed;
                try {
                    succeed = document.execCommand("copy");
                } catch (e) {
                    succeed = false;
                }

                // restore original focus
                if (currentFocus && typeof currentFocus.focus === "function") {
                    currentFocus.focus();
                }

                // clear temporary content
                target.textContent = "";
                document.getElementsByTagName('span')[0].innerHTML = " ";
                return succeed;
            }
            /**************************************************/
            function wccp_pro_log_to_console_if_allowed(title="title", data="") {
                var myName = "";

                if (wccp_pro_log_to_console_if_allowed.caller != null)
                    myName = wccp_pro_log_to_console_if_allowed.caller.toString();

                myName = myName.substr('function '.length);

                myName = myName.substr(0, myName.indexOf('('));

                //console.log("function_name: " + myName);

            }
            /**************************************************/
            function fallbackCopyTextToClipboard(text) {
                var textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    var successful = document.execCommand("copy");
                    var msg = successful ? "successful" : "unsuccessful";
                    console.log("Fallback: Copying text command was " + msg);
                } catch (err) {
                    console.error("Fallback: Oops, unable to copy", err);
                }

                document.body.removeChild(textArea);
            }
            /*****************************************/
            function copyTextToClipboard(text) {
                if (!navigator.clipboard) {
                    fallbackCopyTextToClipboard(text);
                    return;
                }
                navigator.clipboard.writeText(text).then(function() {
                    console.log("Async: Copying to clipboard was successful!");
                }, function(err) {
                    console.error("Async: Could not copy text: ", err);
                });
            }
            /*****************************************/
            /*getSelectionTextAndContainerElement*/
            function getSelectionTextAndContainerElement() {
                var text = ""
                  , containerElement = null;
                if (typeof window.getSelection != "undefined") {
                    var sel = window.getSelection();
                    if (sel.rangeCount) {
                        var node = sel.getRangeAt(0).commonAncestorContainer;
                        containerElement = node.nodeType == 1 ? node : node.parentNode;
                        if (typeof (containerElement.parentElement) != 'undefined')
                            current_clicked_object = containerElement.parentElement;
                        text = sel.toString();
                    }
                } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
                    var textRange = document.selection.createRange();
                    containerElement = textRange.parentElement();
                    text = textRange.text;
                }

                return {
                    text: text,
                    containerElement: containerElement
                };
            }

            function getSelectionParentElement() {
                var parentEl = null, sel;

                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.rangeCount) {
                        parentEl = sel.getRangeAt(0).commonAncestorContainer;
                        //sel.getRangeAt(0).startContainer.parentNode;
                        if (parentEl.nodeType != 1) {
                            parentEl = parentEl.parentNode;
                        }
                    }
                } else if ((sel = document.selection) && sel.type != "Control") {
                    parentEl = sel.createRange().parentElement();
                }

                let arr = new Array();

                arr["nodeName"] = "cant_find_parent_element";

                if (parentEl != null)
                    return parentEl;
                else
                    return arr;
            }
            /*****************************************/
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            /*****************************************/
            function apply_class_exclusion(e) {
                wccp_pro_log_to_console_if_allowed("function", "apply_class_exclusion" + e);

                var my_return = 'No';

                var e = e || window.event;
                // also there is no e.target property in IE. instead IE uses window.event.srcElement

                var target = e.target || e.srcElement || 'nothing';

                //if(target.parentElement != null) console.log (target.parentElement.className);

                var excluded_classes = '' + '';

                var class_to_exclude = "";

                if (target.parentElement != null) {
                    class_to_exclude = target.className + ' ' + target.parentElement.className || '';
                } else {
                    class_to_exclude = target.className;
                }

                var class_to_exclude_array = Array();

                //console.log(class_to_exclude);

                if (typeof (class_to_exclude) != 'undefined')
                    class_to_exclude_array = class_to_exclude.split(" ");

                //console.log (class_to_exclude_array);

                class_to_exclude_array.forEach(function(item) {
                    if (item != '' && excluded_classes.indexOf(item) >= 0) {
                        target.style.cursor = "text";

                        console.log('Yes');

                        my_return = 'Yes';
                    }
                });

                try {
                    class_to_exclude = target.parentElement.getAttribute('class') || target.parentElement.className || '';
                } catch (err) {
                    class_to_exclude = '';
                }

                if (class_to_exclude != '' && excluded_classes.indexOf(class_to_exclude) >= 0) {
                    target.style.cursor = "text";
                    my_return = 'Yes';
                }

                return my_return;
            }
            jQuery(document).ready(function() {
                jQuery(".elementor-element-183c1ca").prepend('<div class="eae-section-bs"><div class="eae-section-bs-inner"></div></div>');
                if ('' === 'yes') {

                    var bgoverlay = 'https://www.gasnikah.com/wp-content/plugins/addon-elements-for-elementor-page-builder//assets/lib/vegas/overlays/00.png';
                } else {
                    if ('') {
                        var bgoverlay = 'https://www.gasnikah.com/wp-content/plugins/addon-elements-for-elementor-page-builder/assets/lib/vegas/overlays/.png';
                    } else {
                        var bgoverlay = 'https://www.gasnikah.com/wp-content/plugins/addon-elements-for-elementor-page-builder/assets/lib/vegas/overlays/00.png';
                    }
                }

                jQuery(".elementor-element-183c1ca").children('.eae-section-bs').children('.eae-section-bs-inner').vegas({
                    slides: [{
                        "src": "assets/gambar/10.jpg"
                    }, {
                        "src": "assets/gambar/2.jpg"
                    }],
                    transition: 'fade2',
                    animation: '',
                    overlay: bgoverlay,
                    cover: true,
                    delay: 5000,
                    timer: false
                });
                if ('' === 'yes') {
                    jQuery(".elementor-element-183c1ca").children('.eae-section-bs').children('.eae-section-bs-inner').children('.vegas-overlay').css('background-image', '');
                }
            });

            function copyText(el) {
                var content = jQuery(el).siblings('div.copy-content').html()
                var temp = jQuery("<textarea>");
                jQuery("body").append(temp);
                temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
                document.execCommand("copy");
                temp.remove();
                var text = jQuery(el).html()
                jQuery(el).html(jQuery(el).data('message'))
                var counter = 0;
                var interval = setInterval(function() {
                    counter++;
                    if (counter == 1) {
                        jQuery(el).html(text)
                    }
                }, 500);
            }
            function copyText(el) {
                var content = jQuery(el).siblings('div.copy-content').html()
                var temp = jQuery("<textarea>");
                jQuery("body").append(temp);
                temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
                document.execCommand("copy");
                temp.remove();
                var text = jQuery(el).html()
                jQuery(el).html(jQuery(el).data('message'))
                var counter = 0;
                var interval = setInterval(function() {
                    counter++;
                    if (counter == 1) {
                        jQuery(el).html(text)
                    }
                }, 500);
            }
