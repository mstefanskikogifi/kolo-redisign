(function () {
  let acc = document.querySelectorAll(".main-content .list-category__accordion");
  for (const accItem of acc) {
    let toggler = accItem.querySelector('.list-category__accordion-header--toggle');
    toggler.addEventListener("click", function () {
      if (accItem.classList.contains('active')) {
        let panel = accItem.querySelector('.list-category');
        accItem.classList.remove("active");
        panel.style.maxHeight = null;
      } else {
        acc.forEach((el) => {
          let panel = el.querySelector('.list-category');
          el.classList.remove("active");
          panel.style.maxHeight = null;
        });
        let activePanel = accItem.querySelector('.list-category');
        accItem.classList.add("active");
        activePanel.style.maxHeight = activePanel.scrollHeight + "px";
      }
    });
  }
})();
