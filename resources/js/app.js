import $ from "jquery";
import * as bootstrap from "bootstrap";

window.$ = window.jQuery = $;
window.bootstrap = bootstrap;


// jQuery UI
// import 'jquery-ui-dist/jquery-ui';
// import 'jquery-ui-dist/jquery-ui.css';

// GLOBAL UPLOAD STATE
// window.uploadStateEligible = {
//     fileId: null,
// };
window.uploadState = {
    "exportDocEligible": {
        "file": null,
        "fileId": null,
    },
    "documentRegulation": {
        "file": null,
        "fileId": null,
    },
    // "primaryProductImages": [
    //     {
    //         "file": File | null,
    //         "imageId": null,
    //         "preview": null,
    //         "sequence": null, // ← URUTAN (1,2,3,...)
    //     },
    // ],
  
     "primaryProductImages": [],
     imageProductModelMeasure:[]
};


// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/custom.css";

// Plugin jQuery
import "datatables.net-bs5";
import "./helpers/utils";
// Product scripts
import "./product/index";

import "./setting/warehouseProfile";


//warehouse profile
