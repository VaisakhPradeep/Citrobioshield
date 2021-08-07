const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const shadow = document.getElementById("shadow");
const context = canvas.getContext("2d");
const width = 1080;
const height = 1400;

const frameCount = 59;
const currentFrame = index => (
  `./images/sequence/${index.toString()}.webp`
)

const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = width;
canvas.height = height;
img.onload = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);

    context.drawImage(img, 0, 0);
}

const changeShadow = scale => {
  if(scale<=38){
    shadow.style.transform = `rotate(${38 - scale}deg)`;
    shadow.style.bottom = `${scale}px`;
  }
  if(window.innerWidth <= 654) {
    if(scale<=20){
      shadow.style.top = `${34-scale}%`;
    }
  }
}

const moveCanvas = val => {
  if(val<=28){
    canvas.style.top = `${56 - val}%`;
  }
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  // console.log(html.scrollHeight)
  const maxScrollTop = 2000  - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  changeShadow(frameIndex);

  if(window.innerWidth <= 644){
    moveCanvas(frameIndex);
  }

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()
changeShadow(0);


var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
});


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

  if(window.innerWidth > 654) {
    tl2.from(`.text${index+1}`, {
      autoAlpha: 0
    }).to(
      `.text${index+1}`,
      {
        autoAlpha: 1
      },
      0.9
    );
  }
  else {
    tl2.from(`.text${index+1}`, {
      autoAlpha: 0
    }).to(
      `.text${index+1}`,
      {
        autoAlpha: 0
      },
      0.9
    );
  }
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    // markers: true,
    trigger: ".last-text",
    start: "top center", 
    end: "top",
    toggleActions: "play none none reverse"
  }
});

tl3.to("#shadow", {
  autoAlpha: 0
}).to("#hero-lightpass", {
  autoAlpha: 0
})


