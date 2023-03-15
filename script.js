const textDiv = document.getElementById("text");
const textArea = document.createElement("textarea");


function editMode() {
  textArea.value = textDiv.innerHTML;
  textArea.addEventListener("keydown", function(event) {
    if (event.keyCode === 83 && event.ctrlKey) {
      event.preventDefault();
      textDiv.innerHTML = textArea.value;
      textArea.replaceWith(textDiv);
    }
  });
  textDiv.replaceWith(textArea);
  textArea.focus();
}


function viewMode() {
  textArea.replaceWith(textDiv);
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 69 && event.ctrlKey) {
    event.preventDefault();
    editMode();
  }
});

textArea.addEventListener("keydown", function(event) {
  if (event.keyCode === 83 && event.ctrlKey) {
    event.preventDefault();
    viewMode();
  }
});



//Таблиця
function sortTable(columnIndex) {
   var table = document.getElementById('myTable');
   var rows = Array.from(table.rows).slice(1);
   var isAscending = true;
   rows.sort(function(rowA, rowB) {
     var cellA = rowA.cells[columnIndex];
     var cellB = rowB.cells[columnIndex];
     if (columnIndex === 1) {
       // сортування числових значень як числа
       return parseInt(cellA.innerHTML) - parseInt(cellB.innerHTML);
     } else {
       // сортування рядкових значень як рядки
       return cellA.innerHTML.localeCompare(cellB.innerHTML);
     }
   });
   // змінюємо порядок рядків у таблиці
   if (table.rows[1] === rows[0]) {
     rows.reverse();
     isAscending = false;
   }
   for (var i = 0; i < rows.length; i++) {
     table.tBodies[0].appendChild(rows[i]);
   }
   // змінюємо напрямок стрілки сортування в заголовку стовпця
   var th = table.tHead.rows[0].cells[columnIndex];
   th.innerHTML = th.innerHTML.replace(/[\u2191\u2193]/g, '');
   if (isAscending) {
     th.innerHTML += ' &#x2191;';
   } else {
     th.innerHTML += ' &#x2193;';
   }
 }




 const block = document.getElementById("block");
        let isResizing = false;
        let lastX = 0;
        let lastY = 0;

        block.addEventListener("mousedown", (event) => {
            const x = event.clientX;
            const y = event.clientY;
            const width = parseInt(getComputedStyle(block, null).getPropertyValue("width"));
            const height = parseInt(getComputedStyle(block, null).getPropertyValue("height"));

            if (width - x < 10 && height - y < 10) { // if mouse click near bottom-right corner
                lastX = x;
                lastY = y;
                isResizing = true;
            }
        });

        block.addEventListener("mousemove", (event) => {
            if (isResizing) {
                const dx = event.clientX - lastX;
                const dy = event.clientY - lastY;
                const width = parseInt(getComputedStyle(block, null).getPropertyValue("width"));
                const height = parseInt(getComputedStyle(block, null).getPropertyValue("height"));
                block.style.width = `${width + dx}px`;
                block.style.height = `${height + dy}px`;
                lastX = event.clientX;
                lastY = event.clientY;
            }
        });

        block.addEventListener("mouseup", () => {
            isResizing = false;
        });