function generate_year_range(start, end) {
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" + year + "'>" + year + "</option>";
	}
	return years;
}

let today = new Date();

currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");
createYear = generate_year_range(1950, 2050);
document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");
let lang = calendar.getAttribute("data-lang");
let months = "";
let days = "";
let myDays;

const monthDefault = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const dayDefault = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

if (lang == "en") {
	months = monthDefault;
	days = dayDefault;
}

let $dataHead = "<tr>";
for (dhead in days) {
	$dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}

$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;
monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
	let firstDay = new Date(year, month).getDay();

	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";

	monthAndYear.innerText = months[month] + " " + year;
	selectYear.value = year;
	selectMonth.value = month;

	let date = 1;

	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");

		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				cell = document.createElement("td");
				cell.setAttribute("data-date", date);
				cell.setAttribute("data-month", month + 1);
				cell.setAttribute("data-year", year);
				cell.setAttribute("data-month_name", months[month]);
				cell.className = `date-picker ${date}`;
				cell.innerHTML = date;

				if (
					date === today.getDate() &&
					year === today.getFullYear() &&
					month === today.getMonth()
				) {
					cell.className = "date-picker selected";
				}
				row.appendChild(cell);

				date++;
			}
		}
		tbl.appendChild(row);
	}
}

function date5(myDays) {
	const value = document.getElementById("value").value;
	const ele = document.getElementsByClassName(value);
	const allEle = document.getElementsByClassName("sel");
	const all = document.getElementsByClassName("date-picker");
	if (value >= myDays || value < 1) {
		alert("Please enter a valid date!");
	}
	if (all[value - 1].innerHTML == value && allEle.length >= 1) {
		allEle[0].classList.remove("sel");
		all[value - 1].className += " sel";
	} else {
		if (all[value - 1].className.split(" ").includes("sel")) {
			all[value - 1].classList.remove("sel");
			all[value - 1].className += " white";
		}
		all[value - 1].className += " sel";
	}
}

const btn = document.querySelector(".Enter-Btn");

btn.addEventListener("click", () => date5(myDays));

const elements = document.getElementsByTagName("td");

function daysInMonth(iMonth, iYear) {
	myDays = 32 - new Date(iYear, iMonth, 32).getDate();
	return myDays;
}
