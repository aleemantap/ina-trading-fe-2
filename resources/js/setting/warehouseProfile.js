
import $ from "jquery";

// import { Editor } from "@tiptap/core";
// import StarterKit from "@tiptap/starter-kit";

import Quill from "quill";
import "quill/dist/quill.snow.css";

$(function () {
//   const element = document.querySelector("#biography");

//   if (!element) return;

//   const editor = new Editor({
//       element: element,
//       extensions: [StarterKit],
//       content: "<p>Write your store biography...</p>",
//   });

//   // Kalau mau kirim ke form
//   const form = element.closest("form");
//   if (form) {
//       form.addEventListener("submit", () => {
//           const hidden = document.createElement("input");
//           hidden.type = "hidden";
//           hidden.name = "biography";
//           hidden.value = editor.getHTML();
//           form.appendChild(hidden);
//       });
//   }
 const el = document.querySelector("#biography");
 if (!el) return;

 new Quill(el, {
     theme: "snow",
     placeholder: "Write your store biography...",
     modules: {
         toolbar: [
             ["bold", "italic", "underline"],
             [{ list: "ordered" }, { list: "bullet" }],
             ["link"],
         ],
     },
 });


//  const form = el.closest("form");
//  if (form) {
//      form.addEventListener("submit", () => {
//          form.querySelector('input[name="biography"]').value =
//              el.querySelector(".ql-editor").innerHTML;
//      });
//  }


});

