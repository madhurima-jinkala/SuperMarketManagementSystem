let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}
window.onscroll = () =>{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
var swiper = new Swiper(".product-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});
var swiper = new Swiper(".review-slider", {
    loop:true,
    spaceBetween: 20,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1020: {
        slidesPerView: 3,
      },
    },
});
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".features .btn");

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent link default action

            const box = button.closest(".box");
            const moreInfo = box.querySelector(".more-info");

            if (moreInfo.style.display === "none") {
                moreInfo.style.display = "block";
                button.textContent = "read less";
            } else {
                moreInfo.style.display = "none";
                button.textContent = "read more";
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.querySelector(".shopping-cart .cart-items");
    const totalDisplay = document.querySelector(".shopping-cart .total");
    const addToCartButtons = document.querySelectorAll(".products .btn");

    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const productBox = button.closest(".box");
            const name = productBox.querySelector("h3").textContent;
            const priceText = productBox.querySelector(".price").textContent.trim().split(" ")[0];
            const price = parseFloat(priceText.replace("Rs.", "").replace("/-", ""));
            const image = productBox.querySelector("img").getAttribute("src");

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty++;
            } else {
                cart.push({ name, price, qty: 1, image });
            }

            renderCart();
        });
    });

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.qty;

            const box = document.createElement("div");
            box.classList.add("box");
            box.innerHTML = `
                <i class="fas fa-trash"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">Rs.${item.price.toFixed(0)}/-</span>
                    <span class="quantity">qty : ${item.qty}</span>
                </div>
            `;

            box.querySelector(".fa-trash").addEventListener("click", () => {
                cart = cart.filter(i => i.name !== item.name);
                renderCart();
            });

            cartItemsContainer.appendChild(box);
        });

        totalDisplay.textContent = ` total : Rs.${total.toFixed(0)}/- `;
    }
});
const reviewForm = document.getElementById('review-form');
  const reviewGrid = document.getElementById('review-grid');

  const predefinedReviews = [
    { name: "Madhurima", text: "Very good website.", rating: 4 },
    { name: "Pallavi", text: "All the stuff on this website is absolutely great.", rating: 3.5 },
    { name: "Mobeen", text: "Good website", rating: 4.5 },
    { name: "Mehataj", text: "Excellent products", rating: 4 }
  ];

  function loadReviews() {
    reviewGrid.innerHTML = '';
    // Show predefined reviews first
    predefinedReviews.forEach(review => {
      addReviewToDOM(review.name, review.text, review.rating, null);
    });

    // Then load user reviews from localStorage
    const userReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    userReviews.forEach((review, index) => {
      addReviewToDOM(review.name, review.text, review.rating, index);
    });
  }

  function saveReview(name, text, rating) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ name, text, rating });
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
  }

  function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.splice(index, 1);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
  }

  function addReviewToDOM(name, text, rating, index) {
    const reviewBox = document.createElement('div');
    reviewBox.className = 'box';

    const stars = document.createElement('div');
    stars.className = 'stars';

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.innerHTML += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
      stars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    reviewBox.innerHTML = `
      <p>${text}</p>
      <h3>${name}</h3>
    `;
    reviewBox.appendChild(stars);

    // Only user reviews get delete buttons
    if (index !== null) {
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => deleteReview(index);
  reviewBox.appendChild(deleteBtn);
}

    reviewGrid.appendChild(reviewBox);
  }

  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('reviewer-name').value.trim();
    const text = document.getElementById('review-text').value.trim();
    const rating = parseFloat(document.getElementById('review-rating').value);
    if (!name || !text || isNaN(rating)) return;
    saveReview(name, text, rating);
    reviewForm.reset();
  });

  loadReviews();

