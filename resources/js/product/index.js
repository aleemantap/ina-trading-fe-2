import $ from "jquery";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import EditStep5 from "./editStep5";
import ActionFormProduct from "./actionFormProduct";


$(function () {

     const page = document.body.dataset.page;
     //DetailView();
    //  console.log("Current page:", page);
 
     if (page === "product-form") {
         Step1();
         Step2();
         Step3();
         Step4();
         Step5();
         ActionFormProduct();
        
         const appData = window.APP_DATA || {};
         if (appData.mode === "edit" && appData.product) {
            //console.log("waaa", appData.product);
            EditStep5(appData.product);
         }
        
     }

      


});
