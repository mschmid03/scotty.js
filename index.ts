import "jquery";
import { gsap } from "gsap";

function addSliderHandler(boxId: string, sliderId: string) {
  const $slider = $(`#${boxId}`);
  const $follower = $slider.find(".follower");
  $follower.css("pointer-events", "none");
  $follower.css("display", "none");
  const $rect = $slider.find(".box");
  $rect.css("cursor", "none");
  const $left = $slider.find(".left");
  const $right = $slider.find(".right");
  if ($slider && $follower && $rect && $left && $right) {
    const offsetY = $follower.outerHeight() / 2;
    const offsetX = $follower.outerWidth() / 2;

    let slider;

    window.fsComponents = window.fsComponents || [];
    window.fsComponents.push([
      "slider",
      (sliderInstances) => {
        // The callback passes a sliderInstances array with all the sliderInstance instances on the page.
        const [sliderInstance] = sliderInstances;
        if (sliderInstance.wrapperEl.classList[0] === `${sliderId}_list`) {
          slider = sliderInstance;
        }
      },
    ]);

    function moveCircle(e) {
      if (!e.originalEvent.sourceCapabilities.firesTouchEvents) {
        const rect = $(this).offset();
        const left = e.pageX - rect.left;
        const top = e.pageY - rect.top;
        const relX = left / $rect.width();
        let baseRotation = relX > 0.5 ? -30 : 30;
        const rotation = (top / $rect.height()) * -2 + 1;

        if (relX > 0.5) {
          $left.hide();
          $right.show();
        } else {
          $left.show();
          $right.hide();
        }

        gsap.to($follower, 0.5, {
          css: {
            left: left - offsetX,
            top: top - offsetY,
            rotation: baseRotation * rotation,
          },
        });
      }
    }

    function clickHandler(e: MouseEvent) {
      const rect = $(this).offset();
      const left = e.pageX - rect.left;
      const relX = left / $rect.width();

      if (relX > 0.5) {
        slider.slideNext(300);
      } else {
        slider.slidePrev(300);
      }
    }

    $rect.on("mousemove", moveCircle);
    $rect.on("click", clickHandler);
    $rect.on("mouseover", (e) => {
      if (!e.originalEvent.sourceCapabilities.firesTouchEvents) {
        $follower.css("display", "block");
        $follower.css({
          top: $rect.height() / 2 - offsetY,
          left: $rect.width() / 2 - offsetX,
        });
      }
    });
    $rect.on("mouseout", () => {
      $follower.css({
        display: "none",
        top: $rect.height() / 2 - offsetY,
        left: $rect.width() / 2 - offsetX,
      });
    });
  }
}
