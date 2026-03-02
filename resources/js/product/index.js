import $ from "jquery";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";

$(function () {

     const page = document.body.dataset.page;

    //  console.log("Current page:", page);

     if (page === "product-form") {
         Step1();
         Step2();
         Step3();
         Step4();
         Step5();
     }


});
