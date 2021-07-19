const btnNewBin = document.getElementById("btnNewBin");
const btnShowBin = document.getElementById("btnShowBin");
const binContents = document.getElementById("binContents");
const newBinCode = document.getElementById("newBinCode");

btnNewBin.onclick = async (event) => {
    try {
        const response = await axios.post("/new", {bin: binContents.value});
        newBinCode.innerHTML = `Your code is: ${response.data.id}`;
    } catch(err) {
        console.log(err);
    }
}

btnShowBin.onclick = async (event) => {
    const id = document.getElementById("code");
    try {
        const response = await axios.get("/get", {params: {id: id.value}});
        document.getElementById("codeResults").innerHTML = response.data;
    } catch(err) {
        console.log(err);
    }
}
