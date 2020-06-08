import "../js/jquery/jquery.min.js";

const eventContent = [
  {
    title: "event-1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
  },
  {
    title: "event-2",
    content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
  },
  {
    title: "event-3",
    content: `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
  },
];

const mapsContent = [
  {
    title: "maps-1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`,
  },
  {
    title: "maps-2",
    content: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.`,
  },
  {
    title: "maps-3",
    content: `Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
  },
];

$(document).ready(function ($) {
  let scrollPos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos > scrollPos) {
      document.getElementById("navbar").style.top = "0px";
      document.getElementById("home-navbar").style.display = "none";
    } else {
      document.getElementById("navbar").style.top = "-50px";
      document.getElementById("home-navbar").style.display = "block";
    }
    scrollPos = currentScrollPos;
  };
  $("#mousearea").mousemove(function (e) {
    let height = e.pageY;
    const width = e.pageX;

    let top = $(window).scrollTop();
    height -= top;
    // console.log(`${height - top} ${width}`);
    const moveY = height / 15;
    const moveX = width / 15;
    $(".bullet-one").css({ transform: `translate(${moveX}px, ${moveY}px)` });
    $(".bullet-two").css({
      transform: `translate(${moveX / 2}px, ${moveY / 2}px)`,
    });
    $(".bullet-three").css({
      transform: `translate(${moveX / 3}px, ${moveY / 3}px)`,
    });
  });

  //event-carousel

  const imageCount = eventContent.length;
  const initDots = (imageCount) => {
    for (let i = 1; i <= imageCount; i++) {
      document.getElementById("carousel-dot-list").innerHTML += `
      <div class="carousel-dot" id="dot-${i}"></div>
      `;
    }
  };

  const initImage = (imageCount) => {
    for (let i = 1; i <= imageCount; i++) {
      document.getElementById("carousel-image-list").innerHTML += `
      <img src="../dist/assets/carousel-${i}.png" class="carousel-image" id="carousel-${i}" alt="carousel-${i}">
      `;
    }
  };

  const activateCarouselItem = (index) => {
    document
      .getElementById(`dot-${index}`)
      .classList.add("carousel-dot-active");
    document
      .getElementById(`carousel-${index}`)
      .classList.add("carousel-image-active");
  };

  const deactivateCarouselItem = (index) => {
    document
      .getElementById(`dot-${index}`)
      .classList.remove("carousel-dot-active");
    document
      .getElementById(`carousel-${index}`)
      .classList.remove("carousel-image-active");
  };
  const changeEventContent = (index) => {
    $(".carousel-heading").html(eventContent[index].title);
    $(".carousel-paragraph").html(eventContent[index].content);
  };

  const getActiveItemIndex = () => {
    return (
      $("#carousel-image-list").children(".carousel-image-active").index() + 1
    );
  };

  $("#arrow-next").click((e) => {
    const index = getActiveItemIndex();
    if (index == imageCount) {
      return;
    } else {
      activateCarouselItem(index + 1);
      deactivateCarouselItem(index);
      changeEventContent(index);
    }
  });

  $("#arrow-prev").click((e) => {
    const index = getActiveItemIndex();
    if (index == 0) {
      return;
    } else {
      activateCarouselItem(index - 1);
      deactivateCarouselItem(index);
      changeEventContent(index - 2);
    }
  });

  const changeActive = (newActive, oldActive) => {
    activateCarouselItem(newActive);
    deactivateCarouselItem(oldActive);
    changeEventContent(newActive - 1);
  };

  $(".carousel-dot").click((e) => {
    const newActivateIndex =
      $(".carousel-dots").children(`#${e.target.id}`).index() + 1;
    const oldActivateIndex =
      $(".carousel-dots").children(`.carousel-dot-active`).index() + 1;
    changeActive(newActivateIndex, oldActivateIndex);
  });

  // maps carousel

  const mapsCount = mapsContent.length;
  const initDotsMaps = (mapsCount) => {
    for (let i = 1; i <= mapsCount; i++) {
      document.getElementById("carousel-dot-list-maps").innerHTML += `
      <div class="carousel-dot" id="dot-maps-${i}"></div>
      `;
    }
  };

  const initImageMaps = (mapsCount) => {
    for (let i = 1; i <= mapsCount; i++) {
      document.getElementById("carousel-image-list-maps").innerHTML += `
      <img src="../dist/assets/carousel-${i}.png" class="carousel-image" id="carousel-maps-${i}" alt="carousel-maps-${i}">
      `;
    }
  };

  const activateCarouselItemMaps = (index) => {
    document
      .getElementById(`dot-maps-${index}`)
      .classList.add("carousel-dot-active");
    document
      .getElementById(`carousel-maps-${index}`)
      .classList.add("carousel-image-active");
  };

  const deactivateCarouselItemMaps = (index) => {
    document
      .getElementById(`dot-maps-${index}`)
      .classList.remove("carousel-dot-active");
    document
      .getElementById(`carousel-maps-${index}`)
      .classList.remove("carousel-image-active");
  };

  const changeEventContentMaps = (index) => {
    $("#carousel-heading").html(mapsContent[index].title);
    $("#carousel-paragraph").html(mapsContent[index].content);
  };

  const getActiveItemIndexMaps = () => {
    return (
      $("#carousel-image-list-maps")
        .children(".carousel-image-active")
        .index() + 1
    );
  };

  $("#arrow-next-maps").click((e) => {
    const index = getActiveItemIndexMaps();
    if (index == mapsCount) {
      return;
    } else {
      activateCarouselItemMaps(index + 1);
      deactivateCarouselItemMaps(index);
      changeEventContentMaps(index);
    }
  });

  $("#arrow-prev-maps").click((e) => {
    const index = getActiveItemIndexMaps();
    if (index == 0) {
      return;
    } else {
      activateCarouselItemMaps(index - 1);
      deactivateCarouselItemMaps(index);
      changeEventContentMaps(index - 2);
    }
  });

  const changeActiveMaps = (newActive, oldActive) => {
    activateCarouselItemMaps(newActive);
    deactivateCarouselItemMaps(oldActive);
    changeEventContentMaps(newActive - 1);
  };

  $(".carousel-dot").click((e) => {
    const newActivateIndex =
      $("carousel-dot-list-maps").children(`#${e.target.id}`).index() + 1;
    const oldActivateIndex =
      $("carousel-dot-list-maps").children(`.carousel-dot-active`).index() + 1;
    changeActive(newActivateIndex, oldActivateIndex);
  });

  //carousell all

  const initCarousel = (imageCount, mapsCount) => {
    //init events
    initDots(imageCount);
    initImage(imageCount);
    //init maps
    initDotsMaps(mapsCount);
    initImageMaps(mapsCount);
    //all caro
    activateCarouselItem(1);
    changeEventContent(0);
    activateCarouselItemMaps(1);
    changeEventContentMaps(0);
  };

  initCarousel(imageCount, mapsCount);
});
