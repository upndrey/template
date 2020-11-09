if (window.addEventListener) 
 {
  window.addEventListener('load', onLoadHandler); 
  window.addEventListener('scroll', myStick); 
  window.addEventListener('scroll', toTopButton); 
 }
else 
  if (window.attachEvent) 
   { 
    window.attachEvent('onload', onLoadHandler); 
    window.attachEvent('onscroll', myStick); 
    window.attachEvent('onscroll', toTopButton); 
   }


/* ----- Top menu - stick ----- */
function myStick() {
  var topmenu = document.getElementById("topmenu");
  var header  = document.getElementById("header");
  var top = topmenu.getBoundingClientRect().top;
  var btm = header.getBoundingClientRect().bottom;

  if (top <= 0) {
    topmenu.classList.add("stick");
  }

  if (btm > 1) {
    topmenu.classList.remove("stick");
  }

}
/* ----- /Top menu - stick ----- */


/* ----- ToTop button ----- */
var smoothJumpUp = function() {
    if (document.body.scrollTop>0 || document.documentElement.scrollTop>0) {
        window.scrollBy(0,-50);
        setTimeout(smoothJumpUp, 20);
    }
}

function toTopButton() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 400) {
  	document.getElementById('to-top-button').classList.add("active");
  } else {
  	document.getElementById('to-top-button').classList.remove("active");
  }
}
/* ----- /ToTop button ----- */



function onLoadHandler() {

  /* ----- Header ----- */
  /* ---- Mobile ---- */
  /* --- Top(left) menu toggle --- */
  document.getElementById("topmenu-header-toggle").onclick = function() {
    this.classList.toggle("active");
    document.getElementById("topmenu-container").classList.toggle("active");
    document.querySelector("body").classList.toggle("overflowhidden");
    event.preventDefault();
  };
  /* --- /Top(left) menu toggle --- */

  /* --- Right menu toggle --- */
  document.getElementById("rightmenu-header-toggle").onclick = function() {
    this.classList.toggle("active");
    document.getElementById("rightmenu").classList.toggle("active");
    event.preventDefault();
  };
  /* --- Right menu toggle --- */
  /* ---- /Mobile ---- */
  /* ----- /Header ----- */


  /* ----- Top menu ----- */
  /* ---- Search ---- */
  document.getElementById("search-toggle").onclick = function() {
    this.classList.toggle("active");
    document.getElementById("topmenu").classList.toggle("active");
    event.preventDefault();
  };

  document.getElementById("search-form-input").onfocus = function() {
    document.getElementById("search-form-input-label").classList.add("focus");
  };
  document.getElementById("search-form-input").onblur = function() {
    if (!this.value) {
      document.getElementById("search-form-input-label").classList.remove("focus");
    }
  };

  /* --- Mobile --- */
  document.getElementById("search-form-input-mobile").onfocus = function() {
    document.getElementById("search-form-input-label-mobile").classList.add("focus");
  };
  document.getElementById("search-form-input-mobile").onblur = function() {
    if (!this.value) {
      document.getElementById("search-form-input-label-mobile").classList.remove("focus");
    }
  };
  /* --- /Mobile --- */
  /* ---- /Search ---- */

  /* ---- Cart ---- */
  document.querySelector(".topmenu .cart-button").onclick = function() {
    document.querySelector(".topmenu .cart-panel").classList.toggle("displaynone");
  }
  //document.querySelector(".topmenu .cart").onblur = function() {
  document.querySelector(".topmenu .cart-button").onblur = function() {
    setTimeout(() => document.querySelector(".topmenu .cart-panel").classList.add("displaynone"), 250);
  }

  document.querySelector(".topmenu .cart-panel-button").onclick = function() {
    window.location.href = "checkout.html";
  }

  /* --- Mobile --- */
  document.querySelector(".header .cart-button-mobile").onclick = function() {
    window.location.href = "cart_new.html";
  }
  /* --- /Mobile --- */
  /* ---- /Cart ---- */

  /* ---- Submenu  ---- */
  /* --- Mobile --- */
  var menuLevel2Items = document.querySelectorAll(".menu-level-2 > a");
  menuLevel2Items.forEach(function(menuLevel2Item) {
    menuLevel2Item.addEventListener('click', function() {

      if (!this.classList.contains("active")) {
        var menuLevel2Items_again = document.querySelectorAll(".menu-level-2 > a.active");
        //var menuLevel2Items_again = document.querySelectorAll(".topmenu-container.active .menu-level-2 > a.active"); // Only for mobiles
        menuLevel2Items_again.forEach(function(menuLevel2Item_again) {
          menuLevel2Item_again.classList.remove("active");
        });
      }

      this.classList.toggle("active");
      event.preventDefault();
      
    })
  });
  /* --- /Mobile --- */
  /* ---- /Submenu  ---- */
  /* ----- /Top menu ----- */


  /* ----- Tabs ----- */
  if (document.getElementById("tabs"))
   {

    /* ---- set the margin on the page reload ---- */
    document.getElementById("tabs").style.marginBottom = window.getComputedStyle(document.querySelector(".tab > input:checked ~ div"), null).height;
    /* ---- /set the margin on the page reload ---- */

    /* ---- set the margin on a tab click ---- */
    var setTabsHeight = function (tabContent) {
      return function() {
        document.getElementById("tabs").style.marginBottom = window.getComputedStyle(tabContent, null).height;
      }
    }

    var x = document.querySelectorAll("#tabs .tab");
    var y = document.querySelectorAll("#tabs .tab .tab-content");
    var i;
    for (i = 0; i < x.length; i++) {
      //x[i].addEventListener('click', setTabsHeight(y[i]));	// Add the event listener
      x[i].onclick = setTabsHeight(y[i]); 			// Overwrite the event listener
    }
    /* ---- /set the margin on a tab click ---- */

   } // if (document.getElementById("tabs"))
    
  /* ---- hover ---- */
  /*
  var tabItems = document.querySelectorAll(".tabs .tab a.tab-item");
  tabItems.forEach(function(tabItem) {
    tabItem.addEventListener('mouseenter', function(event) {
      console.log(this); // !debug!

      event.preventDefault();
      event.stopPropagation();

      var tabItemClone = this.cloneNode(true);
      
      var tabItemCoords = this.getBoundingClientRect();//
      tabItemClone.style.top = tabItemCoords.y + "px";
      tabItemClone.style.left = tabItemCoords.x + "px";
      tabItemClone.style.position = "fixed";
      tabItemClone.style.zIndex = "999";
      tabItemClone.classList.add("cloned");

      //var parentDiv = this.parentNode;
      //var tabItemCloned = parentDiv.insertBefore(tabItemClone, this);
      var parentDiv = this.parentNode.parentNode;
      var tabItemCloned = parentDiv.insertBefore(tabItemClone, this.parentNode);

      // --- Buy button --- 
      var buyBtn = tabItemCloned.querySelector(".tabs .tab .tab-content .buy-button");
      buyBtn.addEventListener('click', putIntoCart.bind(null, buyBtn.getAttribute("data-product_id")));
      // --- /Buy button --- 


      tabItemCloned.addEventListener('mouseout', function() {
        this.remove();
        //this.style.top = "0px"; // !debug!
        console.log("removed"); // !debug!
      })
    })
  });
  */
  /* ---- /hover ---- */

  /* ---- Buy button ---- */
  function putIntoCart(product_id, event) {
//    console.log(product_id); // !debug!
//    console.log(document.querySelector('button[data-product_id="'+product_id+'"] ~ .in-cart > .items-number').innerHTML); // !debug!

    var in_cart = document.querySelector('button[data-product_id="'+product_id+'"] ~ .in-cart');
    if (in_cart) in_cart.style.display = "inline-block";

    var items_in_cart = document.querySelector('button[data-product_id="'+product_id+'"] ~ .in-cart > .items-number');
    if (items_in_cart) {
      items_in_cart.innerHTML = parseInt(items_in_cart.innerHTML) + 1;
      if (parseInt(items_in_cart.innerHTML) > 99)
        items_in_cart.parentNode.style.margin = "0 auto";
    }

    var offset_x, offset_y; // correction of the goal position of the flying cloned image
    offset_x = 50; offset_y = 50;
    var item_img = document.querySelector('a[data-product_id="'+product_id+'"] > .item-image > img');
    if (!item_img) {
      item_img = document.querySelector('.single-product .product-img > img[data-product_id="'+product_id+'"]');
      offset_x = 175; offset_y = 150;
    }
    if (!item_img) {
      item_img = document.querySelector('.account-orders-history .expandable-details-table-row[data-product_id="'+product_id+'"] .product-img > img');
      offset_x = 0; offset_y = 0;
    }
    if (item_img) { 
      var item_img_clone = item_img.cloneNode(true);
      item_img_clone.classList.add("clone");
      var parentDiv = item_img.parentNode.parentNode.parentNode;
      var item_img_cloned = parentDiv.insertBefore(item_img_clone, item_img.parentNode.parentNode);
      item_img_cloned.tabIndex = "-1";

      var item_img_coords = item_img.getBoundingClientRect();//
      item_img_cloned.style.top = item_img_coords.y + "px";
      item_img_cloned.style.right = parseInt(window.innerWidth - item_img_coords.right) + "px";

      var cart_icon;
      if (getComputedStyle(document.querySelector(".topmenu .cart"), null).display !== "none")
        cart_icon = document.querySelector(".topmenu .cart-button");
      else
        if (getComputedStyle(document.querySelector(".header-right-buttons"), null).display !== "none")
          cart_icon = document.querySelector(".header-right-buttons .cart-button-mobile");
        else
          cart_icon = document.querySelector(".header");
      
      var cart_coords = cart_icon.getBoundingClientRect();
      setTimeout(() => console.log(item_img_cloned.style.right = parseInt(window.innerWidth - cart_coords.right - offset_x) + "px"), 1);	// , 2);
      setTimeout(() => console.log(item_img_cloned.style.top = parseInt(cart_coords.top - offset_y) + "px"), 2);		// , 4);
      setTimeout(() => item_img_cloned.classList.add("flying"), 3);								// , 6);
      setTimeout(() => item_img_cloned.remove(), 2000);
    }
    
//    console.log(items_in_cart.innerHTML); // !debug!
    event.preventDefault();
  }
  
  //var buyBtns = document.querySelectorAll(".tabs .tab .tab-content .buy-button");
  var buyBtns = document.querySelectorAll(".buy-button");
  for (i = 0; i < buyBtns.length; i++) {
    //buyBtns[i].onclick = putIntoCart(buyBtns[i].getAttribute("data-product_id")); 				// Overwrite the event listener
    buyBtns[i].addEventListener('click', putIntoCart.bind(null, buyBtns[i].getAttribute("data-product_id"))); 	// Add the event listener
  }
  /* ---- /Buy button ---- */

  /* ---- Add-to-favorites button ---- */
  function AddToFavorites(favBtn, event) {
    if (document.querySelector("body").classList.contains("loggedin")) {
      favBtn.classList.toggle("added-to-favs");
    
      var product_id = favBtn.getAttribute("data-product_id");
      /* ... */

    } else {
      var modalWrap = document.querySelector(".modal.fast-login").parentNode;
      if (modalWrap) 
        modalWrap.classList.remove("displaynone");
    }

    event.preventDefault();
  }
  
  //var favBtns = document.querySelectorAll(".tabs .tab .tab-content .fav-button");
  var favBtns = document.querySelectorAll(".fav-button");
  for (i = 0; i < favBtns.length; i++) {
    //favBtns[i].onclick = AddToFavorites(favBtns[i]); 					// Overwrite the event listener
    favBtns[i].addEventListener('click', AddToFavorites.bind(null, favBtns[i])); 	// Add the event listener
  }
  /* ---- /Add-to-favorites button ---- */
  
  /* ---- Add-to-informme button ---- */
  function AddToInformme(informmeBtn, event) {
    if (document.querySelector("body").classList.contains("loggedin")) {
      informmeBtn.classList.toggle("added-to-informme");
  
      var product_id = informmeBtn.getAttribute("data-product_id");
      /* ... */
    
    } else {
      var modalWrap = document.querySelector(".modal.fast-login").parentNode;
      if (modalWrap) 
        modalWrap.classList.remove("displaynone");
    }

    event.preventDefault();
  }
  
  var informmeBtns = document.querySelectorAll(".informme-button");
  for (i = 0; i < informmeBtns.length; i++) {
    //informmeBtns[i].onclick = AddToInformme(informmeBtns[i]); 				// Overwrite the event listener
    informmeBtns[i].addEventListener('click', AddToInformme.bind(null, informmeBtns[i])); 	// Add the event listener
  }
  /* ---- /Add-to-informme button ---- */
  
  /* ---- Cart icon ---- */
  function gotoCart(event) {
    window.location.href = "cart_new.html";
    event.preventDefault();
  }
  
  var cartIcons = document.querySelectorAll(".tabs .tab .tab-content .in-cart");
  for (i = 0; i < cartIcons.length; i++) {
    cartIcons[i].addEventListener('click', gotoCart);
  }
  /* ---- /Cart icon ---- */
  
  /* ---- Fav icon ---- */
  function gotoFav(event) {
    window.location.href = "account.html?account_tab=account-favorites";
    event.preventDefault();
  }
  
  var favIcons = document.querySelectorAll(".tabs .tab .tab-content .in-fav");
  for (i = 0; i < favIcons.length; i++) {
    favIcons[i].addEventListener('click', gotoFav);
  }
  /* ---- /Fav icon ---- */
  /* ----- /Tabs ----- */


  /* ----- Vertical tabs ----- */
  if (document.getElementById("vertical-tabs"))
   {
    var verticalTabsHeaders = document.querySelectorAll(".vertical-tabs .vertical-tab-header");
    for (i = 0; i < verticalTabsHeaders.length; i++) {
      verticalTabsHeaders[i].addEventListener('change', function() {
        var verticalTabsContents = document.querySelectorAll(".vertical-tabs .vertical-tab-content");
        for (j = 0; j < verticalTabsContents.length; j++) {
          verticalTabsContents[j].classList.remove("active");
        }

        var verticalTabContent = document.querySelector('.vertical-tabs .vertical-tab-content[data-vertical_tab_id="' + this.getAttribute("id") + '"]');
        verticalTabContent.classList.add("active");	// set the active vertical-tab-content
        //document.getElementById("vertical-tabs").style.height = window.getComputedStyle(verticalTabContent, null).height;	// set the height on a tab click
        document.querySelector(".vertical-tabs .vertical-tabs-contents").style.height = window.getComputedStyle(verticalTabContent, null).height;	// set the height on a tab click
      });
    }

    // set the height on the page reload:
    //document.getElementById("vertical-tabs").style.height = window.getComputedStyle(document.querySelector('.vertical-tabs .vertical-tab-content[data-vertical_tab_id="service01"]'), null).height;
    document.querySelector(".vertical-tabs .vertical-tabs-contents").style.height = window.getComputedStyle(document.querySelector('.vertical-tabs .vertical-tab-content[data-vertical_tab_id="service01"]'), null).height;
   }
  /* ----- /Vertical tabs ----- */


  /* ----- Single product ----- */
  /* ---- .comments-tab ---- */
  /* --- .product-rating.vote --- */
  function rateProduct(i, event) {
    var ratingCheckboxes = document.querySelectorAll('.comments-tab .reply-block .checkbox label input[type="checkbox"]');

    for (j = 0; j < ratingCheckboxes.length; j++) {
      ratingCheckboxes[j].checked = false;
    }
    for (j = 0; j <= i; j++) {
      ratingCheckboxes[j].checked = true;
    }

    /*
    if (i==0 && ratingCheckboxes[0].checked) {
      ratingCheckboxes[0].checked = false;
    } else {
      ratingCheckboxes[0].checked = true;
    }
    */
  }
  
  var ratingCheckboxes = document.querySelectorAll('.comments-tab .reply-block .checkbox label input[type="checkbox"]');
  for (i = 0; i < ratingCheckboxes.length; i++) {
    ratingCheckboxes[i].addEventListener('click', rateProduct.bind(null, i));
  }
  /* --- /.product-rating.vote --- */

  /* --- .send-button --- */
  var sendBtn = document.querySelector(".comments-tab .send-button-wrap button");
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      if (!document.querySelector("body").classList.contains("loggedin")) {
        var modalWrap = document.querySelector(".modal.fast-login").parentNode;
        if (modalWrap) {
          modalWrap.classList.remove("displaynone");
          event.preventDefault();
        }
      }
    });
  }
  /* --- /.send-button --- */
  /* ---- /.comments-tab ---- */
  /* ----- /Single product ----- */


  /* ----- Catalog ----- */
  /* ---- Filters ---- */
  var hideFiltersSwitcher = document.getElementById("hideFiltersSwitcher")
  if (hideFiltersSwitcher) 
   {

    /* --- Hide the filters by the switcher --- */
    hideFiltersSwitcher.addEventListener('change', function() {
      if (this.checked) {
        document.querySelector(".filters").classList.add("switched-off");
      } else {
      document.querySelector(".filters").classList.remove("switched-off");
      }
    });
    /* --- /Hide the filters by the switcher --- */
    
    /* --- Hide the filters by clicking the filters frame --- */
    document.querySelector(".filters").addEventListener('click', function(event) {
      document.getElementById("hideFiltersSwitcher").click();
      //this.classList.toggle("switched-off"); // not needed due to the previous line
      event.stopPropagation();
    });
    var filterRows = document.querySelectorAll(".filters .row .filter-values > *");
    for (i = 0; i < filterRows.length; i++) {
      filterRows[i].addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
    var filterRows = document.querySelectorAll(".filters .row .filters-controls");
    for (i = 0; i < filterRows.length; i++) {
      filterRows[i].addEventListener('click', function(event) {
        event.stopPropagation();
      });
    }
    /* --- /Hide the filters by clicking the filters frame --- */

    /* --- The "All" checkbox --- */
    var checkboxAlls = document.querySelectorAll(".filters .checkbox input[type=checkbox].all");
    for (i = 0; i < checkboxAlls.length; i++) {
      checkboxAlls[i].addEventListener('change', function() {
        var toCheck = false;
        if (this.checked) 
          { toCheck = true; }
        var filterCheckboxes = this.parentNode.parentNode.parentNode.querySelectorAll(".checkbox input[type=checkbox]");
        for (i = 0; i < filterCheckboxes.length; i++) {
          filterCheckboxes[i].checked = toCheck;
        }
      });
    }

    /* v1 */
    /*
    var filterRows = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterRows.length; i++) {
      filterRows[i].addEventListener('click', function(event) {
        if (!this.classList.contains("all")) {
          this.parentNode.parentNode.parentNode.querySelector("input[type=checkbox].all").checked = false;
        }
      });
    }
    */
    /* /v1 */

    /* v2 */
    var filterCheckboxes = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener('change', function(event) {
        if (!this.classList.contains("all")) {
          var filterCheckboxesAgain = this.parentNode.parentNode.parentNode.querySelectorAll("input[type=checkbox]");
          var toCheck = true;
          for (j = 1; j < filterCheckboxesAgain.length; j++) {	// we'are starting from 1, not from 0, because we should exclude the "All" checkbox.
            toCheck = toCheck && filterCheckboxesAgain[j].checked;
          }
          if (this.parentNode.parentNode.parentNode.querySelector("input[type=checkbox].all"))
            this.parentNode.parentNode.parentNode.querySelector("input[type=checkbox].all").checked = toCheck;
        }
      });
    }
    /* /v2 */
    /* --- /The "All" checkbox --- */

  }
  /* ---- /Filters ---- */

  var descSummary = document.querySelector(".product-group-description summary")
  if (descSummary) {
    descSummary.addEventListener('click', function(event) {
      this.querySelector(".view_text").classList.toggle("displaynone");
      this.querySelector(".hide_text").classList.toggle("displaynone");
      //event.preventDefault();
    });
  }

  /* ---- set the row's height on the page reload ---- */
  var catRows = document.querySelectorAll(".catalog.blocks .tabs .tab-content .row");
  catRows.forEach(function(catRow) {
    //catRow.style.height = window.getComputedStyle(catRow.querySelector(".tab-item"), null).height;
    catRow.style.height = catRow.querySelector(".tab-item").offsetHeight + 9 + "px";
  });
  /* ---- /set the row's height on the page reload ---- */
  /* ----- /Catalog ----- */


  /* ----- Cart page ----- */
  if (document.getElementById("cart-page")) 
   {
    /* ---- Manual change item's quantity ---- */
    var qtyMinuses = document.querySelectorAll(".cart-page .cart-table-row .qty-count");
    qtyMinuses.forEach(function(qtyMinus) {
      qtyMinus.addEventListener('input', function() {
        var product_id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-product_id");
        //console.log(product_id); // !debug!
        /* ... */
        if (parseInt(this.value) > parseInt(this.getAttribute("max")))
          this.value = this.getAttribute("max");

        var productCost = this.parentNode.parentNode.nextElementSibling;
        productCost.querySelector(".product-cost-view").innerText = productCost.querySelector(".product-cost-value").value = this.parentNode.parentNode.previousElementSibling.querySelector(".product-price-value").value * this.value;
        
        calculateOrderSubtotal();
        calculateOrderDiscount();
        calculateOrderTotal();
      })
    })
    /* ---- /Manual change item's quantity ---- */

    /* ---- Minus item ---- */
    var qtyMinuses = document.querySelectorAll(".cart-page .cart-table-row .qty-minus");
    qtyMinuses.forEach(function(qtyMinus) {
      qtyMinus.addEventListener('click', function() {
        var product_id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-product_id");
        //console.log(product_id); // !debug!
        /* ... */
        this.nextElementSibling.stepDown();
        var productCost = this.parentNode.parentNode.nextElementSibling;
        productCost.querySelector(".product-cost-view").innerText = productCost.querySelector(".product-cost-value").value = this.parentNode.parentNode.previousElementSibling.querySelector(".product-price-value").value * this.nextElementSibling.value;

        calculateOrderSubtotal();
        calculateOrderDiscount();
        calculateOrderTotal();
      })
    })
    /* ---- /Minus item ---- */

    /* ---- Plus item ---- */
    var qtyPluses = document.querySelectorAll(".cart-page .cart-table-row .qty-plus");
    qtyPluses.forEach(function(qtyPlus) {
      qtyPlus.addEventListener('click', function() {
        var product_id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-product_id");
        //console.log(product_id); // !debug!
        /* ... */
        this.previousElementSibling.stepUp();
        var productCost = this.parentNode.parentNode.nextElementSibling;
        productCost.querySelector(".product-cost-view").innerText = productCost.querySelector(".product-cost-value").value = this.parentNode.parentNode.previousElementSibling.querySelector(".product-price-value").value * this.previousElementSibling.value;

        calculateOrderSubtotal();
        calculateOrderDiscount();
        calculateOrderTotal();
      })
    })
    /* ---- /Plus item ---- */

    /* ---- Remove item ---- */
    var removeCrosses = document.querySelectorAll(".cart-page .cart-table-row .remove-item");
    removeCrosses.forEach(function(removeCross) {
      removeCross.addEventListener('click', function() {
        var product_id = this.parentNode.parentNode.parentNode.getAttribute("data-product_id");
        //console.log(product_id); // !debug!
        /* ... */
        this.parentNode.parentNode.parentNode.remove();

        calculateOrderSubtotal();
        calculateOrderDiscount();
        calculateOrderTotal();

        var cartItems = document.querySelectorAll(".cart-page .cart-table-row");
        if (!cartItems.length) {
          document.querySelectorAll(".cart-page .container > div").forEach(function(internalDiv) {
            internalDiv.classList.add("displaynone")
          });
          document.querySelector(".cart-page .container div.cart-is-empty").classList.remove("displaynone");
        }
      })
    })
    /* ---- /Remove item ---- */

    /* ---- Promocode ---- */
    function promocodeToProcents(promocode) {
      var procents = 0;

      switch (promocode) {
        case "PROMO10": procents = 10; break;
        case "PROMO20": procents = 20; break;
      }
      return procents;
    }
    
    document.getElementById("promocode").addEventListener("input", function() {
      this.value = this.value.toUpperCase();
      
      calculateOrderDiscount();
      calculateOrderTotal();
    })
    /* ---- /Promocode ---- */

    /* ---- Bonus ---- */
    document.getElementById("bonus").addEventListener("input", function() {
      if (parseInt(this.value) > parseInt(this.getAttribute("max")))
        this.value = this.getAttribute("max");

      calculateOrderDiscount();
      calculateOrderTotal();
    })
    /* ---- /Bonus ---- */

    /* ---- Total ---- */
    function calculateItemsCosts() {
      var productPrices = document.querySelectorAll(".product-price-value");
      var productCounts = document.querySelectorAll(".qty-count");
      var productCosts  = document.querySelectorAll(".product-cost-value");
      var productCosts_view  = document.querySelectorAll(".product-cost-view");

      for (i = 0; i < productPrices.length; i++) {
        productCosts_view[i].innerText = productCosts[i].value = productPrices[i].value * productCounts[i].value;
      }
    }

    function calculateOrderSubtotal() {
      var orderSubtotal_value = 0;
      var productCosts = document.querySelectorAll(".product-cost-value");

      for (i = 0; i < productCosts.length; i++) {
        orderSubtotal_value += parseInt(productCosts[i].value);
      }

      document.getElementById("order-subtotal").value = orderSubtotal_value;
    }

    function calculateOrderDiscount() {
      var orderPromocode_procents = promocodeToProcents(document.getElementById("promocode").value);
      var orderBonus_value     = parseInt(document.getElementById("bonus").value);
      var orderSubtotal_value  = document.getElementById("order-subtotal").value;
      var orderDiscount_value  = 0;

      orderDiscount_value += Math.round(orderSubtotal_value / 100 * orderPromocode_procents);	// Promocode

      if (Number.isInteger(orderBonus_value)) 
        orderDiscount_value += orderBonus_value;						// Bonus

      if (orderDiscount_value > orderSubtotal_value) {
        document.getElementById("bonus").value = orderBonus_value - (orderDiscount_value - orderSubtotal_value);
        orderDiscount_value = orderSubtotal_value;
      }

      document.getElementById("order-discount").value = orderDiscount_value;

      if (orderPromocode_procents || orderBonus_value) {
        document.getElementById("order-subtotal-wrap").classList.remove("visibilityhidden");
        document.getElementById("order-discount-wrap").classList.remove("visibilityhidden");
      } else {
        document.getElementById("order-subtotal-wrap").classList.add("visibilityhidden");
        document.getElementById("order-discount-wrap").classList.add("visibilityhidden");
      }
    }

    function calculateOrderTotal() {
      var orderSubtotal  = document.getElementById("order-subtotal");
      var orderDiscount  = document.getElementById("order-discount");
      var orderTotal     = document.getElementById("order-total");
      var checkoutButton = document.querySelector(".checkout-button");
      var checkoutOk     = true;

      if (orderDiscount.value > orderSubtotal.value / 2) {
        document.querySelector(".discount-warning").classList.remove("displaynone");
        checkoutOk = false;
      } else {
        document.querySelector(".discount-warning").classList.add("displaynone");
      }

      orderTotal.value = orderSubtotal.value - orderDiscount.value;

      if (orderTotal.value < 1000) {
        checkoutOk = false;
        document.querySelector(".lowtotal-warning").classList.remove("displaynone");
      } else {
        document.querySelector(".lowtotal-warning").classList.add("displaynone");
      }

      if (!checkoutOk) {
        checkoutButton.classList.remove("btn-primary");
        checkoutButton.classList.add("btn-tertiary");
        checkoutButton.classList.add("btn-notavailable");
      } else {
        checkoutButton.classList.remove("btn-tertiary");
        checkoutButton.classList.remove("btn-notavailable");
        checkoutButton.classList.add("btn-primary");
      }
    }
    /* ---- /Total ---- */

    calculateItemsCosts();
    calculateOrderSubtotal();
    calculateOrderDiscount();
    calculateOrderTotal();
   }
  /* ----- /Cart page ----- */

  
  /* ----- Checkout page ----- */
  if (document.getElementById("checkout-page")) 
   {
    document.querySelector(".order").addEventListener("click", function() {
      this.classList.toggle("active");
    });

    /* ---- go to the next accordion panel ---- */
    var continueButtons = document.querySelectorAll(".accordion-panel:not(:last-child) .delivery-details-button");
    continueButtons.forEach(function(continueButton) {
      continueButton.addEventListener('click', function() {
        //this.parentNode.parentNode.parentNode.nextElementSibling.querySelector("label").click();
        if (window.innerWidth < 768)
          window.scrollTo(0, 250);
        event.preventDefault();
      })
    })
    /* ---- /go to the next accordion panel ---- */
    
    /* ---- accordion panel 1 ---- */
    /* --- change the address field - change the delivery methods set --- */
    document.getElementById("delivery_address").addEventListener('change', function() {
      var deliveryMethods = document.querySelectorAll(".delivery-method");
      for (i = 0; i < deliveryMethods.length; i++) {
        deliveryMethods[i].classList.add("displaynone");
        deliveryMethods[i].querySelector("input").checked = false;
      }
      document.getElementById("order-delivery-cost").value = 0;
      document.getElementById("order-total").value = parseInt(document.getElementById("order-subtotal").value);
      
      var deliveryAddress = document.getElementById("delivery_address").value;
      if (deliveryAddress == "Барнаул" || deliveryAddress == "Новоалтайск") {
        var localPlaces = document.querySelectorAll(".local_places");
        for (i = 0; i < localPlaces.length; i++) {
          localPlaces[i].classList.remove("displaynone");
        }
      } else {
        var otherPlaces = document.querySelectorAll(".other_places");
        for (i = 0; i < otherPlaces.length; i++) {
          otherPlaces[i].classList.remove("displaynone");
        }
        if (deliveryAddress == "Алтайский край") {
          var regionPlaces = document.querySelectorAll(".region_places");
          for (i = 0; i < regionPlaces.length; i++) {
            regionPlaces[i].classList.remove("displaynone");
          }
        }
      }

      document.getElementById("accordion-panel-2-warning").classList.remove("displaynone");
      document.getElementById("accordion-panel-3-warning").classList.remove("displaynone");
    })
    /* --- /change the address field - change the delivery methods set --- */

    /* --- button 1 --- */
    function checkDeliveryAddressFields() {	// Check the delivery details filelds in the 1st panel of the accordion.
      /* v1 */
      /*
      var checkOk = true;

      //checkOk = checkOk && (/^[\wА-Яа-я\.,\-\(\) ]+$/i.test( document.getElementById("client_fullname").value ));
      checkOk = checkOk && (document.getElementById("client_fullname").value);
      //checkOk = checkOk && (/^[\wА-Яа-я\.,\-\(\) ]+$/i.test( document.getElementById("delivery_address").value ));
      checkOk = checkOk && (document.getElementById("delivery_address").value);
      checkOk = checkOk && (/^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( document.getElementById("client_phone").value ));
      checkOk = checkOk && (/^[\w\.\-]+@[\w\.\-]+.[\w\.\-]+$/i.test( document.getElementById("client_email").value ));

      return checkOk; 
      */
      /* /v1 */

      /* v2 */
      var checkMsg = "";

      var clientFullname  = document.getElementById("client_fullname");
      var deliveryAddress = document.getElementById("delivery_address");
      var clientPhone     = document.getElementById("client_phone");
      var clientEmail     = document.getElementById("client_email");

      !(/^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/i.test( clientEmail.value )) && ( checkMsg = "Введите правильный E-mail\n"+checkMsg, clientEmail.focus() );
      !(/^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( clientPhone.value )) && ( checkMsg = "Введите правильный номер телефона\n"+checkMsg, clientPhone.focus() );
      !(deliveryAddress.value) && ( checkMsg = "Введите населенный пункт\n"+checkMsg, deliveryAddress.focus() );
      !(clientFullname.value) && ( checkMsg = "Введите ФИО\n"+checkMsg, clientFullname.focus() );

      return checkMsg; 
      /* /v2 */
    }
    
    document.getElementById("delivery-details-button-1").addEventListener('click', function() {
      var checkMsg = checkDeliveryAddressFields();
      if (!checkMsg) {
        document.getElementById("accordion-panel-2").checked = true;
        document.getElementById("accordion-panel-2").focus();
      } else {
        document.getElementById("accordion-panel-1").checked = true;
        //alert("Правильно заполните все поля!");
        alert(checkMsg);
        return false;
      }
    })
    /* --- /button 1 --- */
    /* ---- /accordion panel 1 ---- */

    /* ---- accordion panel 2 ---- */
    document.getElementById("accordion-panel-2").addEventListener('click', function() {
      document.getElementById("delivery-details-button-1").click();
    });

    /* --- select a delivery method --- */
    var deliveryMethods_input = document.querySelectorAll(".delivery-method > input");
    deliveryMethods_input.forEach(function(deliveryMethod_input) {
      deliveryMethod_input.addEventListener('click', function() {
        document.getElementById("accordion-panel-2-warning").classList.add("displaynone");
        document.getElementById("accordion-panel-3-warning").classList.remove("displaynone");
        /* -- change the delivery cost -- */
        switch (this.value) {
          case "courier": document.getElementById("order-delivery-cost").value = 100; break;
          case "bus": document.getElementById("order-delivery-cost").value = 200; break;
          case "russian_post": document.getElementById("order-delivery-cost").value = 300; break;
          case "pek": document.getElementById("order-delivery-cost").value = 400; break;
          case "sdek": document.getElementById("order-delivery-cost").value = 500; break;
          case "delovye_linii": document.getElementById("order-delivery-cost").value = 600; break;
          case "energia": document.getElementById("order-delivery-cost").value = 700; break;
        }
        document.getElementById("order-total").value = parseInt(document.getElementById("order-subtotal").value) + parseInt(document.getElementById("order-delivery-cost").value);
        /* -- /change the delivery cost -- */

        /* -- change the payment methods set -- */
        var paymentMethods = document.querySelectorAll(".payment-method");
        for (i = 0; i < paymentMethods.length; i++) {
          paymentMethods[i].classList.add("displaynone");
          paymentMethods[i].querySelector("input").checked = false;
        }
        
        document.getElementById("bank_card").parentNode.classList.remove("displaynone");
        if (this.value == "courier") {
          document.getElementById("courier_cash").parentNode.classList.remove("displaynone");
          document.getElementById("courier_cashless").parentNode.classList.remove("displaynone");
        } else {
          document.getElementById("paypal").parentNode.classList.remove("displaynone");
          document.getElementById("bank_details").parentNode.classList.remove("displaynone");
          document.getElementById("cod").parentNode.classList.remove("displaynone");
          document.getElementById("e_money").parentNode.classList.remove("displaynone");
          if (this.value == "bus") {
            document.getElementById("bus_driver").parentNode.classList.remove("displaynone");
          }
        }
        /* -- /change the payment methods set -- */
      })
    })
    /* --- /select a delivery method --- */

    /* --- button 2 --- */
    function checkDeliveryMethodsFields() {	// Check the delivery methods filelds in the 2nd panel of the accordion.
      var checkOk = false;
      var deliveryMethods = document.querySelectorAll(".delivery-method > input");
      for (i = 0; i < deliveryMethods.length; i++) {
        checkOk = checkOk || deliveryMethods[i].checked;
      }
      return checkOk;
    }
    
    document.getElementById("delivery-details-button-2").addEventListener('click', function() {
      /* -- check the panel 1 fields -- */
      var checkMsg = checkDeliveryAddressFields();
      if (checkMsg) {
        event.preventDefault();
        document.getElementById("accordion-panel-1").checked = true;
        alert(checkMsg);
        return false;
      }
      /* -- /check the panel 1 fields -- */

      /* -- check the panel 2 fields -- */
      if (checkDeliveryMethodsFields()) {
        document.getElementById("accordion-panel-3").checked = true;
      } else {
        document.getElementById("accordion-panel-2").checked = true;
        alert("Выберите метод доставки!");
        return false;
      }
      /* -- /check the panel 2 fields -- */
    })
    /* --- /button 2 --- */
    /* ---- /accordion panel 2 ---- */

    /* ---- accordion panel 3 ---- */
    document.getElementById("accordion-panel-3").addEventListener('click', function() {
      document.getElementById("delivery-details-button-2").click();
    });

    /* --- select a payment method --- */
    var paymentMethods_input = document.querySelectorAll(".payment-method > input");
    paymentMethods_input.forEach(function(paymentMethod_input) {
      paymentMethod_input.addEventListener('click', function() {
        document.getElementById("accordion-panel-3-warning").classList.add("displaynone");
      })
    })
    /* --- /select a payment method --- */

    /* --- button 3 --- */
    function checkPaymentMethodsFields() {	// Check the payment methods filelds in the 3rd panel of the accordion.
      var checkOk = false;
      var paymentMethods = document.querySelectorAll(".payment-method > input");
      for (i = 0; i < paymentMethods.length; i++) {
        checkOk = checkOk || paymentMethods[i].checked;
      }
      return checkOk;
    }
    
    function checkDeliveryFields(event) {
      /* -- check the panel 1 fields -- */
      var checkMsg = checkDeliveryAddressFields();
      if (checkMsg) {
        event.preventDefault();
        document.getElementById("accordion-panel-1").checked = true;
        alert(checkMsg);
        return false;
      }
      /* -- /check the panel 1 fields -- */

      /* -- check the panel 2 fields -- */
      if (!checkDeliveryMethodsFields()) {
        event.preventDefault();
        document.getElementById("accordion-panel-2").checked = true;
        alert("Выберите метод доставки!");
        return false;
      }
      /* -- /check the panel 2 fields -- */

      /* -- check the panel 3 fields -- */
      if (!checkPaymentMethodsFields()) {
        event.preventDefault();
        document.getElementById("accordion-panel-3").checked = true;
        alert("Выберите метод оплаты!");
        return false;
      }
      /* -- /check the panel 3 fields -- */

      return true;
    }

    document.getElementById("delivery-details-button-3").addEventListener('click', checkDeliveryFields);
    /* --- /button 3 --- */
    /* ---- /accordion panel 3 ---- */
   }
  /* ----- /Checkout page ----- */

  
  /* ----- Account page ----- */
  if (document.getElementById("account-page")) 
   {

    /* ---- "Editable" fields ---- */
    var editFields = document.querySelectorAll(".editable .form-control");
    for (i = 0; i < editFields.length; i++) {
      editFields[i].addEventListener('input', function() {
        this.parentNode.querySelector(".text-value").innerText = this.value;
      });
    }

    /* --- The birthday field -- should be changed only once --- */
    document.getElementById("client_birthday-button").addEventListener('click', function() {
      if (!this.parentNode.parentNode.classList.contains("not-editing"))
        this.classList.add("displaynone");
    });
    /* --- /The birthday field -- should be changed only once --- */
    /* --- The phone field --- */
    document.getElementById("client_phone_prefix").addEventListener('input', function() {
      this.parentNode.querySelector(".text-value").innerText = this.value + " " + document.getElementById("client_phone").value;
    });
    document.getElementById("client_phone").addEventListener('input', function() {
      this.parentNode.querySelector(".text-value").innerText = document.getElementById("client_phone_prefix").value + " " + this.value;
    });
    /* --- /The phone field --- */
    /* --- The address field --- */
    document.getElementById("delivery_city").addEventListener('input', function() {
      this.parentNode.querySelector(".text-value").innerText = this.value + ", " + document.getElementById("delivery_address").value;
    });
    document.getElementById("delivery_address").addEventListener('input', function() {
      this.parentNode.querySelector(".text-value").innerText = document.getElementById("delivery_city").value + ", " + this.value;
    });
    /* --- /The address field --- */

    function checkMyAccountFields() {
      var checkMsg = "";
     
      var clientFullname	= document.getElementById("client_fullname");
      var clientBirthday	= document.getElementById("client_birthday");
      var clientEmail		= document.getElementById("client_email");
      var clientPhonePrefix	= document.getElementById("client_phone_prefix");
      var clientPhone		= document.getElementById("client_phone");
      var deliveryCity		= document.getElementById("delivery_city");
      var deliveryAddress	= document.getElementById("delivery_address");
      var deliveryMethod	= document.getElementById("delivery_method");
      var paymentMethod		= document.getElementById("payment_method");
     
      !(paymentMethod.value) && ( checkMsg = "Введите способ оплаты\n"+checkMsg, paymentMethod.focus() );
      !(deliveryMethod.value) && ( checkMsg = "Введите способ доставки\n"+checkMsg, deliveryMethod.focus() );
      !(deliveryAddress.value) && ( checkMsg = "Введите адрес\n"+checkMsg, deliveryAddress.focus() );
      !(deliveryCity.value) && ( checkMsg = "Введите населенный пункт\n"+checkMsg, deliveryCity.focus() );
//      !(clientPhonePrefix.value) && ( checkMsg = "Введите телефонный код\n"+checkMsg, clientPhonePrefix.focus() );
      !(/^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( clientPhone.value )) && ( checkMsg = "Введите правильный номер телефона\n"+checkMsg, clientPhone.focus() );
      !(/^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/i.test( clientEmail.value )) && ( checkMsg = "Введите правильный E-mail\n"+checkMsg, clientEmail.focus() );
//      !(clientBirthday.value) && ( checkMsg = "Введите дату рождения\n"+checkMsg, clientBirthday.focus() );
      !(clientFullname.value) && ( checkMsg = "Введите ФИО\n"+checkMsg, clientFullname.focus() );
     
      return checkMsg; 
    }
    
    var editButtons = document.querySelectorAll(".edit-button");
    for (i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', function() {
        var checkMsg;

        if (checkMsg = checkMyAccountFields()) {
          alert(checkMsg);
        } else {
          this.classList.toggle("btn-secondary");
          this.classList.toggle("btn-primary");
          this.parentNode.parentNode.classList.toggle("not-editing");
        }
        event.preventDefault();
      });
    }
    /* ---- /"Editable" fields ---- */

    /* ---- Favorites buttons ---- */
    var favBtns = document.querySelectorAll(".account-page .fav-button");
    for (i = 0; i < favBtns.length; i++) {
      favBtns[i].addEventListener('click', function() {
        var product_id = this.getAttribute("data-product_id");
        document.querySelector('.tab-item[data-product_id="' + product_id + '"]').parentNode.remove();
      }); 	
    }
    /* ---- /Favorites buttons ---- */

    /* --- if we come to the Account page from another one --- */
    var params = (new URL(document.location)).searchParams;
    var accountTab = params.get('account_tab');
    if (accountTab) {
      document.querySelector(".tabs .tab." + accountTab + " input").checked = true;
    }
    /* --- /if we come to the Account page from another one --- */
  }
  /* ----- /Account page ----- */


  /* ---- Expandable tables ---- */
  var expandableRows = document.querySelectorAll(".table-like .expandable");
  for (i = 0; i < expandableRows.length; i++) {
    expandableRows[i].addEventListener('click', function() {
      this.classList.toggle("expanded");
    }); 	
  }
  /* ---- /Expandable tables ---- */

    
  /* ----- Contacts page ----- */
  if (document.getElementById("contacts-page")) 
   {
    
    document.getElementById("submit_button").addEventListener('click', function(event) {

      var checkMsg = "";

      var visitorFullname = document.getElementById("visitor_fullname");
      var visitorAddress  = document.getElementById("visitor_address");
      var visitorMessage  = document.getElementById("visitor_message");

      !(visitorMessage.value) && ( checkMsg = "Введите текст сообщения\n"+checkMsg, visitorMessage.focus() );
      !(/^[\w\.\-]+@[\w\.\-]+\.[\w\.\-]+$/i.test( visitorAddress.value )) && 
        !(/^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( visitorAddress.value )) && 
        ( checkMsg = "Введите правильный номер телефона или E-mail\n"+checkMsg, visitorAddress.focus() );
      !(visitorFullname.value) && ( checkMsg = "Введите ФИО\n"+checkMsg, visitorFullname.focus() );

      if (checkMsg) {
        alert(checkMsg);
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    
    })

    /* ---- Google map ---- */
    /* --- the array of the shops addresses --- */
    var shopMaps = {
      shop01: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4762.944121787871!2d83.69588468297265!3d53.352706148243115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcafba4c7a68d3b6c!2zU2Frd2EuUlUsINGB0LXRgtGMINC_0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9GFINC80LDQs9Cw0LfQuNC90L7Qsg!5e0!3m2!1sru!2sru!4v1585511181821!5m2!1sru!2sru",
      shop02: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9525.85181678267!2d83.63500669693661!3d53.35286914525541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42dda26240757d19%3A0x7d27f03400cbd29b!2z0KLQpiDQkNGA0LXQvdCw!5e0!3m2!1sru!2sru!4v1585509747253!5m2!1sru!2sru",
      shop03: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9527.695605476954!2d83.75033647506386!3d53.34461840987865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7b33537df6a5b7f0!2zU2Frd2EuUlUsINGB0LXRgtGMINC_0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9GFINC80LDQs9Cw0LfQuNC90L7Qsg!5e0!3m2!1sru!2sru!4v1585509818384!5m2!1sru!2sru",
      shop04: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8011.931176351792!2d83.68033102259666!3d53.34394734308737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcaae5760e7695629!2zU2Frd2EuUlUsINGB0LXRgtGMINC_0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9GFINC80LDQs9Cw0LfQuNC90L7Qsg!5e0!3m2!1sru!2sru!4v1585509872273!5m2!1sru!2sru",
      shop05: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5663.010936282904!2d83.76099411052648!3d53.3611048422006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x434b944d9ce9894!2zU2Frd2EuUlUsINGB0LXRgtGMINC_0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9GFINC80LDQs9Cw0LfQuNC90L7Qsg!5e0!3m2!1sru!2sru!4v1585509921165!5m2!1sru!2sru",
      shop06: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.2756946147583!2d83.65000761615237!3d53.33832088301307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42dda242ff0027b5%3A0x78d2d7f86f434567!2z0YPQuy4g0JHQsNC70YLQuNC50YHQutCw0Y8sIDExNiwg0JHQsNGA0L3QsNGD0LssINCQ0LvRgtCw0LnRgdC60LjQuSDQutGA0LDQuSwgNjU2MDY3!5e0!3m2!1sru!2sru!4v1585510478777!5m2!1sru!2sru",
      shop07: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2378.1315092925693!2d83.92730831615411!3d53.4124741774566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42ddb1fcc3ee089d%3A0xbe54bbc89746f1a0!2zU2Frd2EuUlUsINGB0LXRgtGMINC_0YDQvtGE0LXRgdGB0LjQvtC90LDQu9GM0L3Ri9GFINC80LDQs9Cw0LfQuNC90L7Qsg!5e0!3m2!1sru!2sru!4v1585510348912!5m2!1sru!2sru",
      shop08: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.217895717642!2d85.15884291613241!3d52.51139564461883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42c4a9789164b17d%3A0x4d55a8faef8faaeb!2z0YPQuy4g0JLQsNGB0LjQu9GM0LXQstCwLCAx0JAsINCR0LjQudGB0LosINCQ0LvRgtCw0LnRgdC60LjQuSDQutGA0LDQuSwgNjU5MzEx!5e0!3m2!1sru!2sru!4v1585510427256!5m2!1sru!2sru",
    };
    /* --- /the array of the shops addresses --- */

    /* --- click on the shop address on the Contacts page --- */
    var shopAddresses = document.querySelectorAll(".contacts-page .shops .shop-address");
    shopAddresses.forEach(function(shopAddress) {
      shopAddress.addEventListener('click', function(event) {
        var modalWrap = document.querySelector(".modal.google-map").parentNode;
        if (modalWrap) {
          var shop = this.getAttribute("data-shop");
          modalWrap.querySelector(".google-map").innerHTML = '<iframe src="' + shopMaps[shop] + '" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>';
          modalWrap.classList.remove("displaynone");
        }
        event.preventDefault();
      })
    })
    /* --- /click on the shop address on the Contacts page --- */

    /* --- if we come to the Contacts page from another one --- */
    var params = (new URL(document.location)).searchParams;
    var shop = params.get('shop');
    if (shop) {
      var modalWrap = document.querySelector(".modal.google-map").parentNode;
      if (modalWrap) {
        modalWrap.querySelector(".google-map").innerHTML = '<iframe src="' + shopMaps[shop] + '" width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>';
        modalWrap.classList.remove("displaynone");
      }
    }
    /* --- /if we come to the Contacts page from another one --- */
    /* ---- /Google map ---- */

   }
  /* ----- /Contacts page ----- */

  
  /* ----- Masterclass-schedule page ----- */
  /* ---- Filters ---- */
  if (document.getElementById("filters")) 
   {
    /* v1 */
    /*
    var filterCheckboxes = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener('change', function(event) {
        var masterclassTRs = document.querySelectorAll(".schedule tr");
        var filterCheckboxesFilter1 = document.querySelectorAll(".filters .filter1 .checkbox input[type=checkbox]");
        var filterCheckboxesFilter2 = document.querySelectorAll(".filters .filter2 .checkbox input[type=checkbox]");
        for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
          masterclassTRs[j].classList.add("displaynone");
          masterclassTRs[j].classList.remove("displaynone_remove");
          for (k = 0; k < filterCheckboxesFilter1.length; k++) {
            if (filterCheckboxesFilter1[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter1[k].value)) {
              masterclassTRs[j].classList.add("displaynone_remove");
            }
          }
          for (k = 0; k < filterCheckboxesFilter2.length; k++) {
            if (filterCheckboxesFilter2[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter2[k].value) && masterclassTRs[j].classList.contains("displaynone_remove")) {
              masterclassTRs[j].classList.remove("displaynone");
            }
          }
        }
      });
    }
    */
    /* /v1 */
    /* v2 */
    /*
    var filterCheckboxes = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener('change', function(event) {
        var masterclassTRs = document.querySelectorAll(".schedule tr");
        if (document.getElementById("filters").classList.contains("sakwa_mode")) {
          for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
            if (masterclassTRs[j].classList.contains(this.value)) {
              masterclassTRs[j].classList.remove("displaynone");
            } else {
              masterclassTRs[j].classList.add("displaynone");
            }
          }
          document.getElementById("filters").classList.remove("sakwa_mode");
          var filterCheckboxesFilterAll = document.querySelectorAll(".filters .checkbox input[type=checkbox].all");
          for (k = 0; k < filterCheckboxesFilterAll.length; k++) {
            if (filterCheckboxesFilterAll[k] != this.parentNode.parentNode.parentNode.parentNode.querySelector(".checkbox input[type=checkbox].all")) {
              filterCheckboxesFilterAll[k].click();
            }
          }
        } else {
          var filterCheckboxesFilter1 = document.querySelectorAll(".filters .filter1 .checkbox input[type=checkbox]");
          var filterCheckboxesFilter2 = document.querySelectorAll(".filters .filter2 .checkbox input[type=checkbox]");
          for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.add("displaynone");
            masterclassTRs[j].classList.remove("displaynone_remove");
            for (k = 0; k < filterCheckboxesFilter1.length; k++) {
              if (filterCheckboxesFilter1[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter1[k].value)) {
                masterclassTRs[j].classList.add("displaynone_remove");
              }
            }
            for (k = 0; k < filterCheckboxesFilter2.length; k++) {
              if (filterCheckboxesFilter2[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter2[k].value) && masterclassTRs[j].classList.contains("displaynone_remove")) {
                masterclassTRs[j].classList.remove("displaynone");
              }
            }
          }
        }
      });
    }
    */
    /* /v2 */
    /* v3 */
    /*
    var filterCheckboxes = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener('change', function(event) {
        var masterclassTRs = document.querySelectorAll(".schedule tr");
        var filtersNode = document.getElementById("filters");
        var currFilterNode = this.parentNode.parentNode.parentNode.parentNode;
        if (filtersNode.classList.contains("sakwa_mode")) {
          var filterCheckboxesCurrFilter = currFilterNode.querySelectorAll(".checkbox input[type=checkbox]");
          for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.add("displaynone");
            for (k = 0; k < filterCheckboxesCurrFilter.length; k++) {
              if (filterCheckboxesCurrFilter[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesCurrFilter[k].value)) {
                masterclassTRs[j].classList.remove("displaynone");
              }
            }
          }
          if (!filtersNode.hasAttribute("first-used-filter") || (filtersNode.getAttribute("first-used-filter") == currFilterNode.className)) { 
            filtersNode.setAttribute("first-used-filter", currFilterNode.className); 
          } else { 
            filtersNode.classList.remove("sakwa_mode"); 
          }
        } else {
          var filterCheckboxesFilter1 = document.querySelectorAll(".filters .filter1 .checkbox input[type=checkbox]");
          var filterCheckboxesFilter2 = document.querySelectorAll(".filters .filter2 .checkbox input[type=checkbox]");
          for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.add("displaynone");
            masterclassTRs[j].classList.remove("displaynone_remove");
            for (k = 0; k < filterCheckboxesFilter1.length; k++) {
              if (filterCheckboxesFilter1[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter1[k].value)) {
                masterclassTRs[j].classList.add("displaynone_remove");
              }
            }
            for (k = 0; k < filterCheckboxesFilter2.length; k++) {
              if (filterCheckboxesFilter2[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter2[k].value) && masterclassTRs[j].classList.contains("displaynone_remove")) {
                masterclassTRs[j].classList.remove("displaynone");
              }
            }
          }
        }
      });
    }
    */
    /* /v3 */
    /* v4 */
    var filterCheckboxes = document.querySelectorAll(".filters .checkbox input[type=checkbox]");
    for (i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener('change', function(event) {
        
        var filterCheckboxesFilter1 = document.querySelectorAll(".filters .filter1 .checkbox input[type=checkbox]");
        var filterCheckboxesFilter1_Checked = [];
        for (j = 0; j < filterCheckboxesFilter1.length; j++)
          if (filterCheckboxesFilter1[j].checked)
            filterCheckboxesFilter1_Checked.push(filterCheckboxesFilter1[j]);

        var filterCheckboxesFilter2 = document.querySelectorAll(".filters .filter2 .checkbox input[type=checkbox]");
        var filterCheckboxesFilter2_Checked = [];
        for (j = 0; j < filterCheckboxesFilter2.length; j++)
          if (filterCheckboxesFilter2[j].checked)
            filterCheckboxesFilter2_Checked.push(filterCheckboxesFilter2[j]);

        var masterclassTRs = document.querySelectorAll(".schedule tr");
          for (j = 1; j < masterclassTRs.length; j++) 	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.add("displaynone");

        if (!filterCheckboxesFilter1_Checked.length && !filterCheckboxesFilter2_Checked.length)
          for (j = 1; j < masterclassTRs.length; j++) 	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.remove("displaynone");

        if (filterCheckboxesFilter1_Checked.length && !filterCheckboxesFilter2_Checked.length)
          for (j = 1; j < masterclassTRs.length; j++) 	// we'are starting from 1, not from 0, because we should not touch the table header
            for (k = 0; k < filterCheckboxesFilter1.length; k++) 
              if (filterCheckboxesFilter1[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter1[k].value)) 
                masterclassTRs[j].classList.remove("displaynone");

        if (!filterCheckboxesFilter1_Checked.length && filterCheckboxesFilter2_Checked.length)
          for (j = 1; j < masterclassTRs.length; j++) 	// we'are starting from 1, not from 0, because we should not touch the table header
            for (k = 0; k < filterCheckboxesFilter2.length; k++) 
              if (filterCheckboxesFilter2[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter2[k].value)) 
                masterclassTRs[j].classList.remove("displaynone");

        if (filterCheckboxesFilter1_Checked.length && filterCheckboxesFilter2_Checked.length)
          for (j = 1; j < masterclassTRs.length; j++) {	// we'are starting from 1, not from 0, because we should not touch the table header
            masterclassTRs[j].classList.remove("displaynone_remove");
            for (k = 0; k < filterCheckboxesFilter1.length; k++) 
              if (filterCheckboxesFilter1[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter1[k].value)) 
                masterclassTRs[j].classList.add("displaynone_remove");
            for (k = 0; k < filterCheckboxesFilter2.length; k++) 
              if (filterCheckboxesFilter2[k].checked && masterclassTRs[j].classList.contains(filterCheckboxesFilter2[k].value) && masterclassTRs[j].classList.contains("displaynone_remove")) 
                masterclassTRs[j].classList.remove("displaynone");
          } // /for (j = 1; j < masterclassTRs.length; j++)

      }); // /filterCheckboxes[i].addEventListener('change', function(event)
    } // /for (i = 0; i < filterCheckboxes.length; i++)
    /* /v4 */
   }
  /* ---- /Filters ---- */

  var masterclassEnrolls = document.querySelectorAll(".masterclass-schedule-page .enroll-button");
  masterclassEnrolls.forEach(function(masterclassEnroll) {
    masterclassEnroll.addEventListener('click', function(event) {
      var modalWrap = document.querySelector(".modal.masterclass-enroll").parentNode;
      if (modalWrap) {
        /* v1 */
        /*
        modalWrap.querySelector(".modal.masterclass-enroll .datetime").innerHTML = this.parentNode.parentNode.querySelector(".datetime").innerHTML;
        modalWrap.querySelector(".modal.masterclass-enroll .title").innerHTML = this.parentNode.parentNode.querySelector(".title").innerHTML;
        */
        /* /v1 */
        /* v2 */
        var masterclassID = this.getAttribute("data-masterclass_id");
        modalWrap.querySelector(".modal.masterclass-enroll .datetime").innerHTML = document.querySelector('.expandable[data-masterclass_id="' + masterclassID + '"] .datetime').innerHTML;
        modalWrap.querySelector(".modal.masterclass-enroll .title").innerHTML = document.querySelector('.expandable[data-masterclass_id="' + masterclassID + '"] .title').innerHTML;
        /* /v2 */

        modalWrap.classList.remove("displaynone");
        /*this.classList.toggle("added-to-enrolls");*/	// !!!
      }
      event.preventDefault();
    })
  })

  var modalEnrollButton = document.querySelector(".modal.masterclass-enroll .enroll-button");
  if (modalEnrollButton) {
    modalEnrollButton.addEventListener('click', function(event) {
      /*event.preventDefault();*/				// !!!
    })
  }
  /* ----- /Masterclass-schedule page ----- */


  /* ----- Payment & delivery methods - hover ----- */
  function payMethodMouseout(img, src, event) {
    img.setAttribute("src", src);
  }
  
  var payMethods = document.querySelectorAll(".payment-methods img");
  payMethods.forEach(function(payMethod) {
    payMethod.addEventListener('mouseenter', function() {
      var src = this.getAttribute("src");
      this.setAttribute("src", src.slice(0, -4)+"_color"+src.slice(-4));
      this.addEventListener('mouseout', payMethodMouseout.bind(null, this, src));
    })
  })
  /* ----- /Payment & delivery methods - hover ----- */


  /* ----- Modal window ----- */
  var modalWrap = document.querySelector(".modal-wrap");
  if (modalWrap) {
    modalWrap.addEventListener("click", function() {
      this.classList.add("displaynone");
    })

    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 27) 
        modalWrap.classList.add("displaynone");
    })
  }
  
  document.querySelector(".modal").addEventListener("click", function(event) {
    event.stopPropagation();
  });
  /* ----- /Modal window ----- */
  /* ________ BACKEND ________  */
    
  function setCorrectSortType() {
      var url = window.location.href;
      var pos1 = url.indexOf("filtertype");
      var value = urlParser("filtertype");
      if(value) {
          var select = document.getElementById("sel1");
          select.value = value;
          switch(value) {
              case "name":
                  select.value = "по названию";
                  break;
              case "color":
                  select.value = "по цвету";
                  break;
              case "volume":
                  select.value = "по объему";
                  break;
              case "price":
                  select.value = "по цене";
                  break;
          }
      }
  }
  setCorrectSortType();

  function urlParser(paramType) {
    var temp = window.location.href.split('?');
    var base = temp[0];
    var params;
    if(temp[1])
        params = temp[1].split('&');
    else
        params = [];

    params = params.map(function (elem) {
        return elem.split('=');
    });
    var result = null;
    params.forEach(function (elem) {
        if(elem[0] === paramType)
          result = elem[1];
    });
    return result;
  }
  
  function urlEditor(paramType, paramValue) {
    var temp = window.location.href.split('?');
    var base = temp[0];
    var params;
    if(temp[1])
        params = temp[1].split('&');
    else
        params = [];
    var noParamFlag = 1;
    params = params.map(function (elem) {
        elem = elem.split('=');
        if(elem[0] === paramType) {
            elem[1] = paramValue;
            noParamFlag = 0;
        }
        return elem;
    });
    if(noParamFlag && paramValue !== "") {
        params.push([paramType, paramValue]);
    }

    params = params.map(function (elem) {
      return elem.join("=");
    });
    params = params.join("&");
    url = `${base}?${params}`;
    window.location.href = url;
  }
  
  /* ----- Sort by ----- */
  var select = document.getElementById("sel1");
  if(select) {
      select.addEventListener("change", function () {
          var correctName = "name";
          switch(select.value) {
              case "по названию":
                  correctName = "name";
                  break;
              case "по цвету":
                  correctName = "color";
                  break;
              case "по объему":
                  correctName = "volume";
                  break;
              case "по цене":
                  correctName = "price";
                  break;
          }
          urlEditor("filtertype", correctName);
      });
  }
  /* ----- /Sort by ----- */
  /* ----- Pagination ----- */
  var pagination = document.querySelector(".pagination");
  if(pagination) {
      var pag1 = document.getElementById("pag1");
      var pag2 = document.getElementById("pag2");
      var pag3 = document.getElementById("pag3");
      var pag4 = document.getElementById("pag4");
      var pag5 = document.getElementById("pag5");
      var prevPage = document.getElementById("prevPage");
      var nextPage = document.getElementById("nextPage");
      var firstPage = document.getElementById("firstPage");
      var lastPage = document.getElementById("lastPage");
      var maxpage = pagination.dataset.maxpage;

      var temp = parseInt(pag3.innerText);
      if(temp > 1) {
          firstPage.dataset.href = "?page=1";
          firstPage.classList.remove("displaynone");
      }
      else {
          firstPage.classList.add("displaynone");
      }

      temp = parseInt(pag3.innerText) - 2;
      if(temp >= 1) {
          pag1.innerText = temp + "";
          pag1.dataset.href = "?page=" + temp;
          pag1.classList.remove("displaynone");
      }
      else {
          pag1.classList.add("displaynone");
      }
      temp = parseInt(pag3.innerText) - 1;
      if(temp >= 1) {
          pag2.innerText = temp + "";
          pag2.dataset.href = "?page=" + temp;
          pag2.classList.remove("displaynone");
      }
      else {
          pag2.classList.add("displaynone");
      }
      if(temp >= 1) {
          prevPage.dataset.href = "?page=" + temp;
          prevPage.classList.remove("displaynone");
      }
      else {
          prevPage.classList.add("displaynone");
      }
      temp = parseInt(pag3.innerText) + 1;
      if(temp <= maxpage) {
          pag4.innerText = temp + "";
          pag4.dataset.href = "?page=" + temp;
          pag4.classList.remove("displaynone");
      }
      else {
          pag4.classList.add("displaynone");
      }
      if(temp <= maxpage) {
          nextPage.dataset.href = "?page=" + temp;
          nextPage.classList.remove("displaynone");
      }
      else {
          nextPage.classList.add("displaynone");
      }
      temp = parseInt(pag3.innerText) + 2;
      if(temp <= maxpage) {
          pag5.innerText = temp + "";
          pag5.dataset.href = "?page=" + temp;
          pag5.classList.remove("displaynone");
      }
      else {
          pag5.classList.add("displaynone");
      }
      temp = parseInt(pag3.innerText);
      if(temp < maxpage) {
          lastPage.dataset.href = "?page=" + maxpage;
          lastPage.classList.remove("displaynone");
      }
      else {
          lastPage.classList.add("displaynone");
      }

      var aList = pagination.querySelectorAll("a");
      aList.forEach(function (a) {
        a.addEventListener("click", function (e) {
          var temp = a.dataset.href.split("=");
          urlEditor("page", temp[1]);
        })
      });

  }
  /* ----- /Pagination ----- */
  /* ----- Search ---- */
    var searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      var searchInput = document.getElementById("searchInput");
      var encoded = encodeURIComponent(searchInput.value);
      urlEditor("search", encoded);
    });

    var searchInput = document.getElementById("searchInput");
    if(searchInput) {
      var value = urlParser("search");
      if(value)
        searchInput.value = decodeURIComponent(value);
    }
  /* ----- /Search ---- */

  /* ________ /BACKEND ________  */
}

