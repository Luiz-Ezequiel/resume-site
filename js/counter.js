window.addEventListener("DOMContentLoaded", event => {
    geVisitCount();
})

const functionApi = '';

const geVisitCount = () => {
    let count = 1
    fetch(functionApi).then(response => {
        response.json()
    }).then(response => {
        console.log("Called API function");
        count = response.count;
        document.getElementById("counter").innerText = count
    }).catch(function(error){
        console.log(error);
    });
    return count
}
