const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const bottleImg = document.querySelector("#mobile-image img");
const shadow = document.getElementById("shadow");
const context = canvas.getContext("2d");
const width = 1080;
const height = 1400;
const frameCount = 60;
let noCanvas = false;
let isMobile = false;
let imageExtension = 'webp'

// Check webp support
Modernizr.on('webp', function (result) {
  if (result) {
    imageExtension = 'webp'
  } else {
    imageExtension = 'png'
  }
});

// Check canvas support
if (!Modernizr.canvas) {
  canvas.classList.add(".no-canvas");
  noCanvas = true;
}


if (window.innerWidth <= 654) {
  isMobile = true;
}


const currentFrame = index => (
  `./images/sequence/${index.toString()}.${imageExtension}`
)

// ---------

canvas.width = width;
canvas.height = height;

const images = []
const bottle = {
  frame: 0
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(bottle, {
  frame: frameCount - 1,
  snap: "frame",
  scrollTrigger: {
    scrub: 0.5,
    start: "top",
    end: "+=1500"
  },
  onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[bottle.frame], 0, 0);
}

// ---------


// const preloadImages = () => {
//   for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.src = currentFrame(i);
//   }
// };


// const img = new Image()
// img.src = currentFrame(1);
// canvas.width = width;
// canvas.height = height;
// img.onload = function () {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   context.drawImage(img, 0, 0);
// }

// const updateImage = index => {
//   img.src = currentFrame(index);

//     context.drawImage(img, 0, 0);
// }

const changeShadow = scale => {
  if (scale <= 38) {
    shadow.style.transform = `rotate(${38 - scale}deg)`;
    shadow.style.bottom = `${scale}px`;
  }
  if (window.innerWidth <= 654) {
    if (scale <= 20) {
      shadow.style.top = `${34 - scale}%`;
    }
  }
}

// const moveCanvas = val => {
//   let x = 30*(val/1200)
//   if(x<=30){
//     canvas.style.top = `${56 - x}%`;
//   }
// }


window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = 2000 - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );


  changeShadow(frameIndex);
  // requestAnimationFrame(() => updateImage(frameIndex + 1))
});

// preloadImages()
changeShadow(0);


var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
});
new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  perView: 5,
  autoplay: 1500,
  // animationDuration: 3000,
  // animationTimingFunc: 'linear',
  animationTimingFunc: 'ease',
  hoverpause: false,
  breakpoints: {
    1024: {
      perView: 4
    },
    654: {
      perView: 3
    }
  }
}).mount()



if (!isMobile) {
  let tl = gsap.timeline({
    // yes, we can add it to an entire timeline!
    scrollTrigger: {
      // markers: true,
      trigger: ".intro-content",
      pin: true,
      start: "top", // when the top of the trigger hits the top of the viewport
      end: "+2000", // end after scrolling 500px beyond the start
      // scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    }
  });
}


const containers = gsap.utils.toArray(".text-container");
containers.forEach((container, index) => {
  let tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      pin: true,
      start: "top bottom",
      end: "top 20%",
      pinSpacing: false,
      scrub: true,
      // markers: true
    }
  });

  if (!isMobile) {
    tl2.from(`.text${index + 1}`, {
      autoAlpha: 0
    }).to(
      `.text${index + 1}`,
      {
        autoAlpha: 1
      },
      0.9
    );
  }
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: ".features",
    start: "top bottom",
    end: "bottom",
    toggleActions: "play none none reverse"
  }
});

tl3.to("#shadow", {
  autoAlpha: 0
}).to("#hero-lightpass", {
  autoAlpha: 0,
  duration: 0.2
})


if (isMobile) {
  var rotate = gsap.timeline({
    scrollTrigger: {
      trigger: ".image-wrap",
      pin: false,
      scrub: 0.2,
      start: 'top top',
      end: '+=500'
    }
  })
    .to('#mobile-image img', {
      x: -50,
      y: -180,
      rotation: -35.5,
      duration: 1, ease: 'none'
    })

  var fade = gsap.timeline({
    scrollTrigger: {
      trigger: ".intro-container",
      pin: false,
      scrub: 0.2,
      start: 'top center',
      end: '+=500'
    }
  })
    .to("#shadow", {
      autoAlpha: 0
    })
    .to('#mobile-image img', {
      autoAlpha: 0
    })

  const textBlock = gsap.utils.toArray(".card-text");
  textBlock.forEach((container, index) => {
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "top 20%",
        pinSpacing: false,
        scrub: true
      }
    });

    tl2.from(`.text${index + 1}`, {
      autoAlpha: 0
    }).to(
      `.text${index + 1}`,
      {
        autoAlpha: 1
      },
      0.9
    );
  });
}


if (noCanvas) {
  var rotate = gsap.timeline({
    scrollTrigger: {
      trigger: ".image-wrap",
      pin: false,
      scrub: 0.2,
      start: 'top top',
      end: '+=500'
    }
  })
    .to('#mobile-image img', {
      x: -150,
      y: -100,
      rotation: -35.5,
      duration: 1, ease: 'none'
    })

  var fade = gsap.timeline({
    scrollTrigger: {
      trigger: ".features",
      pin: false,
      scrub: 0.2,
      start: 'top bottom',
      end: '+=500'
    }
  })
    .to('#mobile-image img', {
      autoAlpha: 0
    })
}


var fadeNav = gsap.timeline({
  scrollTrigger: {
    trigger: ".features",
    pin: false,
    scrub: 0.2,
    start: 'top center',
    end: 'top 40%'
  }
})
  .from(".floating-nav", {
    autoAlpha: 0
  })


