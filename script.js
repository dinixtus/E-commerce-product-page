let pictures = [
    {
        "smallImage": 'images/image-product-1-thumbnail.jpg',
        'bigImage': 'images/image-product-1.jpg',
    },
    {
        "smallImage": 'images/image-product-2-thumbnail.jpg',
        'bigImage': 'images/image-product-2.jpg',
    },
    {
        "smallImage": 'images/image-product-3-thumbnail.jpg',
        'bigImage': 'images/image-product-3.jpg',
    },
    {
        "smallImage": 'images/image-product-4-thumbnail.jpg',
        'bigImage': 'images/image-product-4.jpg',
    },
]

let cartButton = document.getElementById('cartButton'),
    cart = document.getElementById('cart'),
    minusButton = document.getElementById('minus'),
    plusButton = document.getElementById('plus'),
    countSpan = document.getElementById('count'),
    addButton = document.getElementById('addButton'),
    emptyCart = document.getElementById('emptyCart'),
    mainCart = document.getElementById('mainCart'),
    fullCart = document.getElementById('full-cart'),
    underButtons = document.querySelectorAll('.under-button'),
    mainPhotoButton = document.getElementById('mainPhotoButton'),
    activeCart = document.getElementById('activeCart'),
    hiddenPhoto = document.getElementById('hiddenPhoto'),
    hiddenBlock = document.getElementById('hiddenBlock'),
    underHiddenButtons = document.querySelectorAll('.under-hidden-button'),
    deleteHiddenBlock = document.getElementById('deleteHiddenBlock'),
    nextPectureButton = document.getElementById('nextPectureButton'),
    previosPictureButton = document.getElementById('previosPictureButton'),
    checkOutButton = document.getElementById('checkOutButton'),
    hamburger = document.getElementById('hamburger'),
    hiddenMenu = document.getElementById('hiddenMenu'),
    nextMainPictureButton = document.getElementById('nextMainPictureButton'),
    previosMainPictureButton = document.getElementById('previosMainPictureButton'),
    deleteCartButton = document.getElementById('deleteCartButton');

cartButton.addEventListener('click', function() {
    if(cart.classList.contains('hidden')) {
        cart.classList.remove('hidden');
    } else {
        cart.classList.add('hidden');
    }
});

deleteCartButton.addEventListener('click', function() {
    cart.classList.add('hidden');
});

plusButton.addEventListener('click', function() {
    let count = +(countSpan.innerHTML);
    count++;
    countSpan.innerHTML = `${count}`;
});

minusButton.addEventListener('click', function() {
    let count = +(countSpan.innerHTML);
    if(count > 0) {
        count = count - 1;
    }
    countSpan.innerHTML = `${count}`;
});

addButton.addEventListener('click', function() {
    let count = +(countSpan.innerHTML);
    let fullPrice = count * 125; 
    if(count > 0) {
        emptyCart.style.display = 'none';
        mainCart.innerHTML = `<div class="selected-product">
          <img src="images/image-product-1-thumbnail.jpg" alt="light beige suede sneakers. Front view">
          <div class="selected-product-info">
            <h3>Fall Limited Edition Sneakers</h3>
            <div class="price-selected-block">
              <span>$125.00</span> x <span class="selected-count">${count}</span> <span class="full-price">$${fullPrice}</span>
            </div>
          </div>
          <button class="delete-selected-product" id='deleteSelectedProduct'><img src="images/icon-delete.svg" alt=""></button>
        </div>`;
        countSpan.innerHTML = `0`;
        fullCart.classList.remove('hidden');
        activeCart.classList.remove('hidden');
    }
});

document.addEventListener('click', function(e) {
    let deleteSelectedProduct = e.target.closest('#deleteSelectedProduct');

    if(deleteSelectedProduct) {
        mainCart.innerHTML = ``;
        emptyCart.style.display = 'block';
        fullCart.classList.add('hidden');
        activeCart.classList.add('hidden');
    }
});

underButtons.forEach(button => {
    button.addEventListener('click', function() {
        let imgThis = button.firstElementChild;
        let imgThisSrc = imgThis.getAttribute('src');
        for(let i = 0; i < pictures.length; i++) {
            if(imgThisSrc === pictures[i].smallImage) {
                mainPhotoButton.firstElementChild.setAttribute('src', pictures[i].bigImage);
            }
        }
        underButtons.forEach(btn => btn.classList.remove('active-img'))
        button.classList.add('active-img');
    })
});

mainPhotoButton.addEventListener('click', function() {
    let mainSrc = mainPhotoButton.firstElementChild.getAttribute('src');
    hiddenPhoto.setAttribute('src', mainSrc);
    hiddenBlock.classList.remove('hidden');

    let currentIndex = pictures.findIndex(picture => picture.bigImage === mainSrc);


    underHiddenButtons.forEach(btn => btn.classList.remove('active-img'));

    for(let i = 0; i < underHiddenButtons.length; i++) {
        let underHiddenButtonsSrc = underHiddenButtons[i].firstElementChild.getAttribute('src');
        if(underHiddenButtonsSrc === pictures[currentIndex].smallImage) {
            underHiddenButtons[i].classList.add('active-img');
        }
    }
})

underHiddenButtons.forEach(button => {
    button.addEventListener('click', function() {
        let imgSrc = button.firstElementChild.getAttribute('src');
        for(let i = 0; i < pictures.length; i++) {
            if(imgSrc === pictures[i].smallImage) {
                hiddenPhoto.setAttribute('src', pictures[i].bigImage)
            }
        }
        underHiddenButtons.forEach(btn => btn.classList.remove('active-img'))
        button.classList.add('active-img');
    })
})

deleteHiddenBlock.addEventListener('click', function() {
    hiddenBlock.classList.add('hidden');
})

nextPectureButton.addEventListener('click', function() {
    let hiddenPhotoSrc = hiddenPhoto.getAttribute('src');
    
    let currentIndex = pictures.findIndex(picture => picture.bigImage === hiddenPhotoSrc);

    if (currentIndex !== -1) {
        // Рассчитываем следующий индекс
        let nextIndex = (currentIndex + 1) % pictures.length; // Циклично возвращаемся к началу
        hiddenPhoto.setAttribute('src', pictures[nextIndex].bigImage);
        underHiddenButtons.forEach(btn => btn.classList.remove('active-img'));
        for(let i = 0; i < underHiddenButtons.length; i++) {
            let underHiddenButtonsSrc = underHiddenButtons[i].firstElementChild.getAttribute('src')
            if(underHiddenButtonsSrc === pictures[nextIndex].smallImage) {
                underHiddenButtons[i].classList.add('active-img');
            }
        }
    }
})

previosPictureButton.addEventListener('click', function() {
    let hiddenPhotoSrc = hiddenPhoto.getAttribute('src');

    let currentIndex = pictures.findIndex(picture => picture.bigImage === hiddenPhotoSrc);
    let index = currentIndex + 4;
    if (currentIndex !== 4) {
        let previosIndex = (index - 1) % pictures.length;
        console.log(previosIndex)
        hiddenPhoto.setAttribute('src', pictures[previosIndex].bigImage);
        underHiddenButtons.forEach(btn => btn.classList.remove('active-img'));
        for(let i = 0; i < underHiddenButtons.length; i++) {
            let underHiddenButtonsSrc = underHiddenButtons[i].firstElementChild.getAttribute('src')
            if(underHiddenButtonsSrc === pictures[previosIndex].smallImage) {
                underHiddenButtons[i].classList.add('active-img');
            }
        }
    }
})

checkOutButton.addEventListener('click', function() {
    location.reload();
})

hamburger.addEventListener('click', function() {
    hiddenMenu.classList.add('active-menu');
});

deleteHiddenMenu.addEventListener('click', function() {
    hiddenMenu.classList.remove('active-menu');
});

nextMainPictureButton.addEventListener('click', function(){
    let mainPhotoSrc = mainPhotoButton.firstElementChild.getAttribute('src');
    console.log(mainPhotoSrc)
    let currentIndex = pictures.findIndex(picture => picture.bigImage === mainPhotoSrc);

    if(currentIndex !== -1) {
        let nextIndex = (currentIndex + 1) % pictures.length;
        mainPhotoButton.firstElementChild.setAttribute('src', pictures[nextIndex].bigImage);
    }
});

previosMainPictureButton.addEventListener('click', function() {
    let mainPhotoSrc = mainPhotoButton.firstElementChild.getAttribute('src');
    let currentIndex = pictures.findIndex(picture => picture.bigImage === mainPhotoSrc);
    let index = currentIndex + 4;
    if(currentIndex !== 4) {
        let nextIndex = (index - 1) % pictures.length;
        mainPhotoButton.firstElementChild.setAttribute('src', pictures[nextIndex].bigImage);
    }
})