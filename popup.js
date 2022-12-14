// Show and hide form when clicked on Add row-
function show_hide() {
  $("#form").hide();
  $("#editform").hide();
  $("#edit_time_form").hide();
  $(".add").hide();
  $(".add_time").hide();

  $("#initializeadd").click(function () {
    $("#add").prop("disabled", false);
    $("#form").toggle(400);
    $("#day_input").val("");
    $("#Slot-1_input").val("");
    $("#Slot-2_input").val("");
    $("#Slot-3_input").val("");
    $("#Slot-4_input").val("");
  });
}
show_hide();

// Delete row-
$(document).on("click", ".delete", function () {
  var del = $(this).parents("tr").find("th").text();
  console.log(del);

  itemstr = localStorage.getItem("item");
  item = JSON.parse(itemstr);
  let correct_index;
  for (var i = 0; i < item.length; i++) {
    if (item[i][0][0] == del) {
      correct_index = i;
      console.log(correct_index);
    }
  }
  item.splice(correct_index, 1);

  console.log(JSON.stringify(item));
  localStorage.setItem("item", JSON.stringify(item));
  $(this).parents("tr").remove();
});

// Edit time-
$(document).on("click", ".edit_time", function () {
  $(".edit").prop("disabled", true);
  $("#initializeadd").prop("disabled", true);
  $(".delete").prop("disabled", true);
  $(this).parent().find(".add_time, .edit_time").toggle();
  var time = $(this).parent().find("span").text();
  $("#edit_time_form").toggle(400);
  $("#time_input").val(time);
});

$(document).on("click", ".add_time", function () {
  $(this).parent().find(".add_time, .edit_time").toggle();
  $("#initializeadd").prop("disabled", false);
  $(".edit").prop("disabled", false);
  $(".delete").prop("disabled", false);
  var timeinput = $("#time_input").val();

  const pos_time = this.getAttribute("data-relpostime");
  console.log(pos_time);

  timestr = localStorage.getItem("item_time");
  item_time = JSON.parse(timestr);
  for (let i = 0; i < item_time.length; i++) {
    if (`${i}` == pos_time) {
      var time_i = i;
    }
  }
  item_time[time_i] = timeinput;
  localStorage.setItem("item_time", JSON.stringify(item_time));
  $(this).parent().find("span").text(timeinput);
  $("#edit_time_form").hide(400);
});

// Edit form toggle-
$(document).on("click", ".edit", function () {
  $(".edit_time").prop("disabled", true);
  $(".edit").prop("disabled", true);
  $("#initializeadd").prop("disabled", true);
  $(".delete").prop("disabled", true);
  $(this).parent().find(".add, .edit").toggle();
  var linktext = $(this).parent().find("a").prop("href");

  var edit_text = $(this).parent().find("span").text();

  $("#editform").toggle(400);
  $("#edit_input").val(edit_text);
  $("#link_input").val(linktext);
});

// Add changes-
$(document).on("click", ".add", function () {
  $(".edit_time").prop("disabled", false);
  $(this).parent().find(".add, .edit").toggle();
  $("#initializeadd").prop("disabled", false);
  $(".edit").prop("disabled", false);
  $(".delete").prop("disabled", false);
  var slot_1 = $("#edit_input").val();
  var slot_2 = $("#link_input").val();

  const pos = this.getAttribute("data-relpos");
  console.log(pos);
  // CHANGE IN LOCAL STORAGE-
  itemstr = localStorage.getItem("item");
  item = JSON.parse(itemstr);
  for (let i = 0; i < item.length; i++) {
    for (let j = 0; j < item[i].length; j++) {
      if (`${i}${j}` == pos) {
        var index_i = i;
        var index_j = j;
      }
    }
  }
  item[index_i][index_j][0] = slot_1;
  item[index_i][index_j][1] = slot_2;
  localStorage.setItem("item", JSON.stringify(item));
  $(this).parent().find("span").text(slot_1);
  $(this).parent().find("a").prop("href", slot_2);
  $("#editform").hide(400);
});

// Add row-
function update() {
  var slot0 = document.getElementById("day_input").value;
  var slot1 = document.getElementById("Slot-1_input").value;
  var slot2 = document.getElementById("Slot-2_input").value;
  var slot3 = document.getElementById("Slot-3_input").value;
  var slot4 = document.getElementById("Slot-4_input").value;

  itemstr = localStorage.getItem("item");
  item = JSON.parse(itemstr);
  item.push([
    [slot0, "https://www.youtube.com/"],
    [slot1, "https://www.youtube.com/"],
    [slot2, "https://www.youtube.com/"],
    [slot3, "https://www.youtube.com/"],
    [slot4, "https://www.youtube.com/"],
  ]);
  localStorage.setItem("item", JSON.stringify(item));

  let tablebody = document.getElementById("tablebody");
  let str = "";
  item.forEach((element, i) => {
    str += `
    <tr>
      <th scope="row" data-position="x">${element[0][0]}</th>
      <td>  <a href=${element[1][1]} target="_blank"><span>${element[1][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}1"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[2][1]} target="_blank"><span>${element[2][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}2"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[3][1]} target="_blank"><span>${element[3][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}3"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[4][1]} target="_blank"><span>${element[4][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}4"><img src="add.png" alt="add" /></button></td>
      <td>  <button class="delete">
      <img src="trash-fill.png" alt="delete" />
    </button></td>     
      </tr>           
    `;
  });
  tablebody.innerHTML = str;
}
$("#add").click(function () {
  alert("New row added!");
  update();
  $("#form").toggle(400);
  $(".add").hide();
});

// Document ready text-
$(document).ready(function () {
  if (localStorage.getItem("item_time") == null) {
    item_time = [];
    item_time.push("1st Year");
    item_time.push("9:00-10:00");
    item_time.push("11:00-13:00");
    item_time.push("15:00-16:00");
    item_time.push("16:00-17:00");
    localStorage.setItem("item_time", JSON.stringify(item_time));
  } else {
    timestr = localStorage.getItem("item_time");
    item_time = JSON.parse(timestr);
  }
  let tablehead = document.getElementById("tablehead");
  let time_str = "";
  item_time.forEach((element, i) => {
    time_str += `
    <th scope="col"><span>${element}</span><button class="edit_time">✏️</button>
              <button class="add_time" data-relpostime="${i}"><img src="add.png" alt="add_time" /></button></th>`;
  });
  tablehead.innerHTML = time_str;
  $(".add_time").hide();

  if (localStorage.getItem("item") == null) {
    item = [];
    item.push([
      ["MON", ""],
      ["Maths", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
    ]);
    item.push([
      ["TUE", ""],
      ["Maths", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
    ]);
    item.push([
      ["WED", ""],
      ["Maths", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
    ]);
    item.push([
      ["THURS", ""],
      ["Maths", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
    ]);
    item.push([
      ["FRI", ""],
      ["Maths", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
      ["Phy", "https://www.youtube.com/"],
    ]);

    
    localStorage.setItem("item", JSON.stringify(item));
  } else {
    itemstr = localStorage.getItem("item");
    item = JSON.parse(itemstr);

    // localStorage.setItem("item", JSON.stringify(item));
  }
  let tablebody = document.getElementById("tablebody");
  let str = "";
  item.forEach((element, i) => {
    str += `
    <tr>
      <th scope="row" data-position="x">${element[0][0]}</th>
      <td>  <a href=${element[1][1]} target="_blank"><span>${element[1][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}1"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[2][1]} target="_blank"><span>${element[2][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}2"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[3][1]} target="_blank"><span>${element[3][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}3"><img src="add.png" alt="add" /></button></td>
      <td>  <a href=${element[4][1]} target="_blank"><span>${element[4][0]}</span
      ></a
      ><button class="edit" >✏️</button>
      <button class="add" data-relpos="${i}4"><img src="add.png" alt="add" /></button></td>
      <td>  <button class="delete">
      <img src="trash-fill.png" alt="delete" />
    </button></td>     
      </tr>          
    `;
  });
  tablebody.innerHTML = str;
  $(".add").hide();
});

$(document).on("click", "#reset", function () {
  localStorage.clear();
  location.reload();
});
