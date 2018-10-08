var m, max, select;
window.onload = function () {
	select = document.createElement("select")
	select.id = "OptionBar"
	document.body.appendChild(select)
	for (var i = 1; i < 90; i++) {
		var option = document.createElement("option");
		option.text = "" + i;
		option.value = i;
		select.appendChild(option);
	}
}

// Amenakarch chanaparhi voroshumy
// Stexcum enq matrix vori yuraqanchyur tox hetazotelov tarrery ir mej pahum e ayd hamarov tar (-1,hamarakalumy 0ic enq sksum) hasnelu chanaparhy 
//ev te vor gagatic minimal heravorutyamb karox enq hasnel ayntex,
// matrixi 3rd baxadrichy tox e vor ogtagorcvum e hetagayum cuyc talu hamar te inchpes e arajacel tvyal tary
function Algorithm(a, D, C1, C2) {
	var u = [[1, 0, 'U<sub>1</sub> = 0 ']];
	var l = Number.MAX_SAFE_INTEGER;
	for (var i = 1; i < a; i++)
		u[i] = [l, l, "U<sub>" + (i + 1) + "</sub> = min ( "]
	for (i = 1; i <= a; i++) {
		var q = C1.indexOf(i);
		var min = D[q] + u[i - 1][1];

		if (min < u[C2[q] - 1][1]) {
			u[C2[q] - 1][0] = i;
			u[C2[q] - 1][1] = min;
			u[C2[q] - 1][2] += "U<sub>" + i + "</sub> + d<sub>" + i + "," + C2[q] + "</sub> (" + D[q] + '+' + u[i - 1][1] + "),";
		}
		var j = q;
		while (j < C1.length) {
			while ((j < C1.length) && (C1[j] != i))
				j++;
			if (j < C1.length)
				if (D[j] + u[i - 1][1] < u[C2[j] - 1][1]) {
					u[C2[j] - 1][0] = i;
					u[C2[j] - 1][1] = D[j] + u[i - 1][1];
					u[C2[j] - 1][2] += "U<sub>" + i + "</sub> + d<sub>" + i + "," + C2[j] + "</sub> (" + D[j] + '+' + u[i - 1][1] + "),";
				}
				else if (u[C2[j] - 1][1] < l + 1 && u[C2[j] - 1][0] != i)
					u[C2[j] - 1][2] += "U<sub>" + i + "</sub> + d<sub>" + i + "," + C2[j] + "</sub> (" + D[j] + '+' + u[i - 1][1] + "),";
			j++;
		}

	}
	u[0] = [1, 0, 'U<sub>1</sub> = 0 ']
	var txt = document.createElement("p")
	txt.innerHTML = u[0][2];
	document.body.appendChild(txt);
	for (var i = 1; i < a; i++) {
		u[i][2] = u[i][2].substring(0, u[i][2].length - 1) + ')'
		u[i][2] += "= " + u[i][1] + " (" + u[i][0] + ")  ";
		var txt = document.createElement("p")
		txt.innerHTML = u[i][2];
		document.body.appendChild(txt);
	}
	x = a;


	str = "The shortest road is { " + a + ",";
	while (u[x - 1][0] != 1) {
		str += u[x - 1][0] + ",";/*a + 1 -*/
		x = u[x - 1][0];
	}
	str += " 1 } distance is " + u[a - 1][1];
	var txt = document.createElement("p")
	txt.innerHTML = str;
	document.body.appendChild(txt);
}
// Vercnum enq mutqayin arjeqnery
function validation() {
	var A = [];
	var B = [];
	var C = [];
	for (var i = 0; i < m; i++) {
		A[i] = parseInt(document.getElementById("input0_" + i).value);
		B[i] = parseInt(document.getElementById("input1_" + i).value);
		C[i] = parseInt(document.getElementById("input2_" + i).value);
	}
	max = (Math.max(...A) > Math.max(...B)) ? Math.max(...A) : Math.max(...B);
	Algorithm(max, C, A, B)
}
// Nermucman tupikneri stexcum
function CreateInput() {
	m = document.getElementById("OptionBar").value;
	document.body.innerHTML = "";
	var tbl = document.createElement('table');
	tbl.setAttribute("width", "600px")
	var tbdy = document.createElement('tbody');
	var div = document.createElement('div');
	document.createElement('div').setAttribute("id", "div1");
	var div2 = document.createElement('div');
	document.createElement('div').setAttribute("id", "div2");
	var div3 = document.createElement('div');
	document.createElement('div').setAttribute("id", "div3");
	for (var i = 0; i <= 2; i++) {
		var td = document.createElement('td');
		var tr = document.createElement('tr');
		var label = document.createElement('label');
		if (i == 0) {
			label.innerHTML = "C <sub>i</sub>";

			div1 = div;
		}
		else if (i == 1) {
			label.innerHTML = "C <sub>j</sub>";
			div1 = div2;
		}
		else {
			label.innerHTML = "D<sub>ij</sub>";
			div1 = div3;
		}
		td.appendChild(label);
		tr.appendChild(td)
		td = document.createElement('td');
		for (var j = 0; j < m; j++) {


			var input = document.createElement("input");
			input.type = "text";
			input.style.width = 90 / 20 + "vw";
			input.setAttribute("id", "input" + i + "_" + j);
			input.setAttribute("placeholder", "  " + (i + 1) + "-" + (j + 1));
			div1.appendChild(input);
		}
		td.appendChild(div1);
		tr.appendChild(td)
		tbdy.appendChild(tr);
		tbl.appendChild(tbdy);
		document.body.appendChild(tbl);
	}
	var input = document.createElement("input");
	input.type = "submit";
	input.value = "submit";
	input.setAttribute("class", 'r-button')
	input.setAttribute("onclick", "validation()");
	document.body.appendChild(input);
}

