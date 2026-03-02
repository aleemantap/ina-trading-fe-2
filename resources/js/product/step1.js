import $ from "jquery";
// import api from "../helpers/api";
import { apiGet } from "@/helpers/apiService";


export default function Step1() {
 
    const appData = window.APP_DATA || {};
    let currentStep = 1;
    const totalSteps = 5;
    loadMainCategories();

    
    function showStep(step) {
        $(".step").removeClass("active");
        $(".step-" + step).addClass("active");
        $("#stepCounter").text(step);

        //  RESET SEMUA TOMBOL
        $("#prevBtn").addClass("d-none");
        $("#nextBtn").addClass("d-none");
        $("#submitBtn").addClass("d-none");
        $("#saveToDraft").addClass("d-none");

        // ===== STEP 1 =====
        if (step === 1) {
            $("#pageTitle").text(
                "Hello, " + (window.AUTH_USER?.name ?? "PT Contoh Seller")
            );
            $("#pageBreadcrumb").addClass("d-none");

            $("#nextBtn").removeClass("d-none");
        }

        // ===== STEP 2 =====
        else if (step === 2) {
            $("#pageTitle").text("Input Your Product Detail");
            $("#pageBreadcrumb").removeClass("d-none").html(`
            <ol class="breadcrumb mb-3">
                <li class="breadcrumb-item text-muted">Post Product</li>
                <li class="breadcrumb-item active">Input Product Detail</li>
            </ol>
        `);

            $("#prevBtn").removeClass("d-none");
            $("#nextBtn").removeClass("d-none");
            $("#saveToDraft").removeClass("d-none");
        }

        // ===== STEP 3 =====
        else if (step === 3) {
            $("#pageTitle").text("Input Your Product Model");
            $("#pageBreadcrumb").html(`
            <ol class="breadcrumb mb-3">
                <li class="breadcrumb-item text-muted">Post Product</li>
                <li class="breadcrumb-item">Input Product Detail</li>
                <li class="breadcrumb-item active">Product Model</li>
            </ol>
        `);

            $("#prevBtn").removeClass("d-none");
            $("#nextBtn").removeClass("d-none");
            $("#saveToDraft").removeClass("d-none");
        }

        // ===== STEP 4 =====
        else if (step === 4) {
            $("#pageTitle").text("Input Your Product Information");
            $("#pageBreadcrumb").html(`
            <ol class="breadcrumb mb-3">
                <li class="breadcrumb-item text-muted">Post Product</li>
                <li class="breadcrumb-item">Input Product Detail</li>
                <li class="breadcrumb-item">Product Model</li>
                <li class="breadcrumb-item active">Product Information</li>
            </ol>
        `);

            $("#prevBtn").removeClass("d-none");
            $("#nextBtn").removeClass("d-none");
            $("#saveToDraft").removeClass("d-none");
        }

        // ===== STEP 5 (FINAL) =====
        else if (step === 5) {
            $("#pageTitle").text("Input Your Additional Detail");
            $("#pageBreadcrumb").html(`
            <ol class="breadcrumb mb-3">
                <li class="breadcrumb-item text-muted">Post Product</li>
                <li class="breadcrumb-item">Input Product Detail</li>
                <li class="breadcrumb-item">Product Model</li>
                <li class="breadcrumb-item">Product Information</li>
                <li class="breadcrumb-item active">Export And Warehouse</li>
            </ol>
        `);

            $("#prevBtn").removeClass("d-none");
            $("#submitBtn").removeClass("d-none"); //  Save & Post
            $("#saveToDraft").removeClass("d-none"); // optional
        }
    }



    function validateStep(step) {
        let valid = true;
        $(".step-" + step + " .required").each(function () {
            if ($(this).val().trim() === "") {
                $(this).addClass("is-invalid");
                valid = false;
            } else {
                $(this).removeClass("is-invalid");
            }
        });
        return valid;
    }
    // NEXT
    $("#nextBtn").on("click", function () {
        if (!validateStep(currentStep)) return;
        currentStep++;
        showStep(currentStep);
    });
    // PREV
    $("#prevBtn").on("click", function () {
        currentStep--;
        showStep(currentStep);
    });
    // TAB CLICK
    $(".step-tabs li").on("click", function () {
        const step = $(this).data("step");
        // Cegah loncat kalau step sebelumnya belum valid
        for (let i = 1; i < step; i++) {
            if (!validateStep(i)) return;
        }
        currentStep = step;
        showStep(step);
    });
    // INIT — INI PENTING
    showStep(1);
   
   
    $("#mainCategory").on("change", function () {
        const categoryId = $(this).val();
        loadSubCategories(categoryId);
    });


    function loadMainCategories() {
        const select = $("#mainCategory");

        select.prop("disabled", true);
        select.empty();
        select.append('<option value="">Loading category...</option>');

        apiGet("/categories")
            .then((res) => {
                select.empty();
                select.append(
                    '<option value="">List of Main category</option>'
                );

                if (res.responseCode !== "0000") return;

                res.rows.forEach((item) => {
                    select.append(
                        `<option value="${item.id}">${item.name}</option>`
                    );
                });

                select.prop("disabled", false);

              
                if (appData.mode === "edit" && appData.product) {
                    //console.log("TES=",appData.product)
                    setEditCategory(appData.product);
                }

            })
            .catch(() => {
                // optional, interceptor sudah handle auth error
                select.html(
                    '<option value="">Failed to load category</option>'
                );
            });
    }

   
    async function setEditCategory(product) {
        // if (!product?.subCategory?.length) return;
        // console.log("product.subCategory", product);
        const subCategory = product.subCategory;
        const mainCategoryId = subCategory.category.id;
        const subCategoryId = subCategory.id;

        // Set main category TANPA trigger change
        $("#mainCategory").val(mainCategoryId);

        // Load sub category dan set selected
        await loadSubCategories(mainCategoryId, subCategoryId);
    }

    async function loadSubCategories(categoryId, selectedId = null) {
        const subCategory = $("#subCategory");

        subCategory.prop("disabled", true);
        subCategory.empty();
        subCategory.append('<option value="">Loading sub category...</option>');

        if (!categoryId) {
            subCategory.html('<option value="">Sub category</option>');
            return;
        }

        try {
            const res = await apiGet(`/sub/${categoryId}/categories`);

            subCategory.empty();
            subCategory.append('<option value="">Sub category</option>');

            if (res.responseCode !== "0000") return;

            res.rows.forEach((item) => {
                subCategory.append(
                    `<option value="${item.id}">${item.name}</option>`,
                );
            });

            subCategory.prop("disabled", false);

            //  SET VALUE JIKA ADA
            if (selectedId) {
                subCategory.val(selectedId);
            }
        } catch (e) {
            subCategory.html(
                '<option value="">Failed to load sub category</option>',
            );
        }
    }
}