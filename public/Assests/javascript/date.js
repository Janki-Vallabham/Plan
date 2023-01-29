const timeElement = document.querySelector(".time");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
}, 200);


var hamburger_menu = document.querySelector(".hamburger_menu");
	var dd_wrap = document.querySelector(".dd_wrap");
	var a_parent =  document.querySelectorAll(".a_parent");

	hamburger_menu.addEventListener("click", function(){
		dd_wrap.classList.toggle("active");
		a_parent.forEach(function(aitem){
			aitem.classList.remove("active");
		})
	})

	

	a_parent.forEach(function(aitem){

		aitem.addEventListener("click", function(){
			a_parent.forEach(function(aitem){
				aitem.classList.remove("active");
			})
			aitem.classList.add("active");
		})
	})
