console.log('this is postman clone project');

// initialize no of parameters 
let paramsCount = 0;

//utility function
// 1. function for getting dom element from string
function getElementFromString(str) {
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild;
}

// hide the paramters box initially
const parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none';

// if the user clicks on params, hide the json box else hide the params box 

const paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJSON').style.display = 'none';
    parametersBox.style.display = 'block';


})
const JSONRadio = document.getElementById('JSONRadio')
JSONRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJSON').style.display = 'flex';
})

// If the user clicks on plus button add more parameters

const addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    const params = document.getElementById('params');


    let str = `   <div class="form-row my-2">
    <label class="col-sm-2 col-form-label " for="parameterKey${paramsCount + 2}">Parameter ${paramsCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${paramsCount + 2}" placeholder="Enter parameter ${paramsCount + 2} key">
    </div>
    <div class="col-md-4">

        <input type="text" class="form-control" id="parameterValue${paramsCount + 2}" placeholder="Enter parameter ${paramsCount + 2} Value">
    </div>

    <button class="btn btn-primary deleteParam">-</button>
</div>`

    // convert the element string to dom node
    let paramElement = getElementFromString(str);
    // console.log(paramElement);
    params.appendChild(paramElement)
    // add an event listener to remove the parameter on clicking minus button

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (let item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
            paramsCount--;
        })
    }
    paramsCount++;
})

// If the user clicks on submit

const submit = document.getElementById('submit')

submit.addEventListener('click', () => {
    // show please wait in the response box to request patience from the user

    document.getElementById('responseJSON').value = 'Please wait, fetching response...';

    // fetch all the vaules user has entered
    const url = document.getElementById('url').value;

    const requestType = document.querySelector("input[name='requestType']:checked").value;

    const contentType = document.querySelector("input[name='contentType']:checked").value;



    // if user has used params option instead of json, collect all the values of the parameters
    if (contentType == 'Custom Parameters') {
        data = {};
        for (let i = 0; i < paramsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {

                let key = document.getElementById('parameterKey' + (i + 1)).value
                let value = document.getElementById('parameterValue' + (i + 1)).value

                data[key] = value;
            }

        }
        data = JSON.stringify(data)
    }
    else {
        data = document.getElementById('jsonText').value
    }

    // log all the values in the console for debugging 
    console.log(url);
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    // If the request type is post invoke the fetch api to post request
    if (requestType == 'GET') {

        fetch(url, {
            method: 'GET'

        })
            .then(Response => Response.text())
            .then((text) => {
                document.getElementById('responseJSON').innerHTML = text;
                Prism.highlightAll();
            })

    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.text())
            .then((text) => {
                document.getElementById('responseJSON').innerHTML = text
                Prism.highlightAll();
            })

    }
    // {
    //     'title': 'foo',
    //         'body': 'bar',
    //             'userId': 1,
    //   }


})

