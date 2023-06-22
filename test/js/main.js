document.addEventListener('DOMContentLoaded', function() {
    var carouselItems = document.querySelectorAll('.carousel-item');
    var carouselInner = document.querySelector('.carousel-inner');
    var prevButton = document.querySelector('.carousel-prev');
    var nextButton = document.querySelector('.carousel-next');
    var slideWidth = carouselItems[0].offsetWidth;
    var currentIndex = 0;
  
    function slideTo(index) {
      carouselInner.style.transform = 'translateX(' + (-slideWidth * index) + 'px)';
      currentIndex = index;
    }
  
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        slideTo(currentIndex - 1);
      }
    });
  
    nextButton.addEventListener('click', function() {
      if (currentIndex < carouselItems.length - 1) {
        slideTo(currentIndex + 1);
      }
    });
  });
  