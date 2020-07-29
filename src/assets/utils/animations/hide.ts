import anime from "animejs";
import themeVariables from "../../theme/variables";

const hide = (target: HTMLDivElement | null, cb?: () => void) => {
  anime({
    targets: target,
    opacity: 0,
    duration: themeVariables.transition.transition_1,
    easing: "linear",
    loop: false,
    complete: () => {
      if (target) target.setAttribute("style", "display:none;");
      if (cb) cb();
    },
  });
};

export default hide;
