$(document).ready(function () {
  $(".accordion").each((index, acc) => {
    $(acc)
      .find(".accordion-element")
      .each((index, element) => {
        resetAccordion(element);

        $(element).on("click", () => {
          $(element).toggleClass("active");
        });
      });
  });

  function resetAccordion(element) {
    $(element).each((index, item) => {
      $(item).removeClass("active");
    });
  }
});
