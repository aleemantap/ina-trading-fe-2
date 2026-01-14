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
    exportDocEligible: {
        file: null,
        fileId: null,
    },
    documentRegulation: {
        file: null,
        fileId: null,
    },
    primaryProductImages: [
        {
            file: File | null,
            imageId: null,
            preview: null,
            sequence: null, // ← URUTAN (1,2,3,...)
        },
    ],
    imageProductModelMeasure: [
        {
            file: File | null,
            imageId: null,
            panelKe: null,
        },
    ],
};


// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/custom.css";

// Plugin jQuery
import "datatables.net-bs5";

// Product scripts
import "./product/index";
