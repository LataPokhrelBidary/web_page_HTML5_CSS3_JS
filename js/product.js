var prodRows = document.getElementById("myTb");

var prodRequest;

var prodData;

var sortOrder = "D";

prodRequest = new XMLHttpRequest();

prodRequest.open("GET", "/json/product.json");

prodRequest.send();

prodRequest.onload = function () {

    prodData = JSON.parse(prodRequest.responseText);

    renderTable(prodData);
}

function renderTable(data) {
    var prodRowData = "";

    for (i = 0; i < data.length; i++) {
        prodRowData += "<tr><td id='prodId" + i + "'>" + data[i].prodID + "</td><td><img src=" + data[i].prodImg + "></td><td id='prodName" + i + "'>" + data[i].prodName + "</td><td>" + data[i].prodDesc + "</td><td>" + data[i].prodPrice + "</td><td><input type='number' min ='0' max = '9' id='ProdQty" + i + "' value='0'</td></tr>";
    }


    prodRows.innerHTML = prodRowData;
}

function confirmQty() {

    var q0 = document.getElementById("ProdQty0").value;
    var q1 = document.getElementById("ProdQty1").value;
    var q2 = document.getElementById("ProdQty2").value;
    var q3 = document.getElementById("ProdQty3").value;
    var q4 = document.getElementById("ProdQty4").value;
    var q5 = document.getElementById("ProdQty5").value;
    var q6 = document.getElementById("ProdQty6").value;
    var q7 = document.getElementById("ProdQty7").value;
    var q8 = document.getElementById("ProdQty8").value;
    var q9 = document.getElementById("ProdQty9").value;

    var p0 = document.getElementById("prodId0").innerText;
    var p1 = document.getElementById("prodId1").innerText;
    var p2 = document.getElementById("prodId2").innerText;
    var p3 = document.getElementById("prodId3").innerText;
    var p4 = document.getElementById("prodId4").innerText;
    var p5 = document.getElementById("prodId5").innerText;
    var p6 = document.getElementById("prodId6").innerText;
    var p7 = document.getElementById("prodId7").innerText;
    var p8 = document.getElementById("prodId8").innerText;
    var p9 = document.getElementById("prodId9").innerText;



    var products = [];



    if (q0 > 0) {
        products += document.getElementById("prodName0").innerText + ": Qty " + q0 + ": Id " + p0 + "\n";
    }

    if (q1 > 0) {
        products += document.getElementById("prodName1").innerText + ": Qty " + q1 + ": Id " + p1 + "\n";
    }

    if (q2 > 0) {
        products += document.getElementById("prodName2").innerText + ": Qty " + q2 + ": Id " + p2 + "\n";
    }

    if (q3 > 0) {
        products += document.getElementById("prodName3").innerText + ": Qty " + q3 + ": Id " + p3 + "\n";
    }

    if (q4 > 0) {
        products += document.getElementById("prodName4").innerText + ": Qty " + q4 + ": Id " + p4 + "\n";
    }
    if (q5 > 0) {
        products += document.getElementById("prodName5").innerText + ": Qty " + q5 + ": Id " + p5 + "\n";
    }

    if (q6 > 0) {
        products += document.getElementById("prodName6").innerText + ": Qty " + q6 + ": Id " + p6 + "\n";
    }

    if (q7 > 0) {
        products += document.getElementById("prodName7").innerText + ": Qty " + q7 + ": Id " + p7 + "\n";
    }

    if (q8 > 0) {
        products += document.getElementById("prodName8").innerText + ": Qty " + q8 + ": Id " + p8 + "\n";
    }

    if (q9 > 0) {
        products += document.getElementById("prodName9").innerText + ": Qty " + q9 + ": Id " + p9 + "\n";
    }

    if (products > "" && products != null) {
        var resposeUser = confirm("Are you sure you want to order the following: \n" + products);
        if (resposeUser) {

            var orderObj = [];
            var prodJSON;

            for (i = 0; i < prodData.length; i++) {

                var rowNum = i.toString();
                var columnID = "ProdQty" + rowNum;
                var iQty = document.getElementById(columnID).value;

                if (iQty > 0) {

                    columnID = "prodName" + rowNum;
                    
                    var prod_columnID = "prodId" + rowNum;
                    var prodID = document.getElementById(prod_columnID).innerText;

                    orderObj.push({ "prodID": prodID });
                    orderObj.push({ "prodQty": iQty });



                }
            }
            prodJSON = JSON.stringify(orderObj);
            localStorage.setItem("orderItems", prodJSON);

            alert("Thank you. Your order has been placed!!!")


        }

    }

}

//reset function

const reset = document.querySelector('#reset');

reset.addEventListener('click', function () {

    const confirmReset = confirm("are you sure you want to cancel your selection?")
    if (confirmReset) {
        const quantityInputs = document.querySelectorAll('input[type="number"][value]')
        quantityInputs.forEach(input => {
            input.value = 0;
        });

    }
    else {
        quantityInputs.forEach(input => {
            input.value = input;
        });

    }
});


//sort functions

function sortByID() {
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function (a, b) {
            return a.prodID - b.prodID;
        });
        sortOrder = "D";
    }
    else    //sort in descending order
    {
        prodData.sort(function (a, b) {
            return b.prodID - a.prodID;
        });
        sortOrder = "A";
    }
    renderTable(prodData);
}

function sortByName() {
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function (a, b) {
            if (a.prodName < b.prodName) {
                return -1;
            }
        });
        sortOrder = "D";
    }
    else    //sort in descending order
    {
        prodData.sort(function (a, b) {
            if (a.prodName > b.prodName) {
                return -1
            }
        });
        sortOrder = "A";
    }
    renderTable(prodData);
}

function sortByPrice() {
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function (a, b) {
            return a.prodPrice - b.prodPrice;
        });
        sortOrder = "D";
    }
    else    //sort in descending order
    {
        prodData.sort(function (a, b) {
            return b.prodPrice - a.prodPrice;
        });
        sortOrder = "A";
    }
    renderTable(prodData);
}

