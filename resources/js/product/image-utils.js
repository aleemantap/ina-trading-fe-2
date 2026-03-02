import $ from "jquery";

export function renderImages() {


    function renderImages() {
        const images = window.uploadState.primaryProductImages;
        console.log("images", images);
        $("#bigThumb").html(
            images[0]
                ? `
            <div class="position-relative h-100 w-100">
                <img src="${images[0].preview}" class="img-fluid h-100 w-100 object-fit-cover">
                <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                    #${images[0].sequence}
                </span>
                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="0">x</button>
            </div>
            `
                : "+",
        );

        $("#multiImageUpload .smallThumb").each(function (i) {
            const idx = i + 1;
            if (images[idx]) {
                $(this).html(`
                <div class="position-relative h-100 w-100">
                    <img src="${images[idx].preview}" class="img-fluid h-100 w-100 object-fit-cover">
                    <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                        #${images[idx].sequence}
                    </span>
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${idx}">x</button>
                </div>
            `);
            } else {
                $(this).html("+");
            }
        });

        $("#extraThumbs").empty();
        if (images.length > 4) {
            images.slice(4).forEach((img, i) => {
                $("#extraThumbs").append(`
                <div class="position-relative border rounded" style="width:100px;height:100px">
                    <img src="${
                        img.preview
                    }" class="img-fluid h-100 w-100 object-fit-cover">
                    <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                        #${img.sequence}
                    </span>
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${
                        i + 4
                    }">x</button>
                </div>
            `);
            });
        }
    }


}
