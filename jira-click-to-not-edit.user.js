// ==UserScript==
// @name Click to Not Edit
// @match *://*.atlassian.net/*
// @run-at document-start
// @license ISC
// ==/UserScript==
//
// This is supposed to disable click-to-edit in the description field in Jira unless ctrl or cmd is held.
// The behavior of click on other places is preserved.

document.addEventListener('click',
  ((event)=>{
    if (event.metaKey || event.ctrlKey){
      return;  // allow normal click-to-edit when key is held
    }
    var e = event.target;
    var is_description = false;
    for (let n = e; n.parentNode; n = n.parentNode) {
      // Check if it inside the description block
      if (n.className === 'ak-renderer-document') {
          is_description = true;
          break;
      }
    }
    if (!is_description) return;
    while (e != document){
      var aa = e.attributes;
      for (var i=0; i<aa.length; ++i){
        var a = aa[i];
        if(a.name=='role' && a.value=='presentation' && e.tagName!='SPAN'){
          // This is an attempt to cleanly match relevant elements (comments, description) despite class obfuscation.
          // Excluding <span> avoids inhibiting clicks on attach/link buttons.

          console.log("CLICKED TO NOT EDIT, hold ctrl/cmd if you really want the thing to happen");
          event.preventDefault(); event.stopPropagation(); return false;
        };
      }
      e = e.parentNode;
    }
  }),
  {capture: true})
