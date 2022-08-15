let canvas = document.getElementById("canvas");

let helpMsg = `
  Move your cursor or finger to control the direction of the snake.
  <br><br>
  The full list of pride flags and source code is available on <a href='https://github.com/Walker30263/pridespace'>GitHub</a>.
  <br><br>
  DM sky#4793 on Discord to get a pride flag added or get your own custom subpage, like https://pridespace.ga/(your name)
`;

canvas.addEventListener("dblclick", function() {
  Swal.fire({
    icon: "info",
    title: "Pride Space",
    html: helpMsg,
    iconColor: "#ffffff",
    background: "#310052",
    color: "#ffffff",
  });
});
