import anime from "animejs";
import themeVariables from "../../theme/variables";

const show = (target: HTMLDivElement | null, cb?: () => void) => {
  if (target) target.setAttribute("style", "display:block;");
  anime({
    targets: target,
    opacity: 1,
    duration: themeVariables.transition.transition_1,
    easing: "linear",
    loop: false,
    complete: () => {
      if (cb) cb();
    },
  });
};

export default show;
