$(document).ready(function () {


    $('.tabs').each((index, tab) => {

        $(tab).find('.tab-button').each((index, button) => {
            const content = $(button).data('tab');

            if (content) {
                $(button).removeClass('active')
                $(`#${content}`).removeClass("active")

                if (!index) {
                    $(button).addClass('active')
                    $(`#${content}`).addClass("active")
                }

                $(button).on('click', () => {
                    resetTabButtons(tab)
                    $(button).addClass('active')
                    $(`#${content}`).addClass("active")
                })
            }


        })
    })

    function resetTabButtons(tab) {
        $(tab).find('.tab-button').each((index, button) => {
            const content = $(button).data('tab');

            if (button) {
                $(button).removeClass('active')
                $(`#${content}`).removeClass("active")
            }
        })
    }
});

// $(button).find('.tab-button').each((index,item) => {
//     const tab = $(item).data('tab');
//
//     if (tab && tab!==undefined) {
//         $(button).addClass('active')
//         if (!index) {
//             console.log($(tab))
//             $(tab).addClass("active")
//         }
//         $(item).on('click', () => {
//             console.log($(tab))
//         })
//     }
// })