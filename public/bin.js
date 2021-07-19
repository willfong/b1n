const btnNewBin = document.getElementById("btnNewBin");
const btnShowBin = document.getElementById("btnShowBin");
const binContents = document.getElementById("binContents");
const newBinCode = document.getElementById("newBinCode");

btnNewBin.onclick = async (event) => {
    const response = await axios.post("/new", {bin: binContents.value});
    newBinCode.innerHTML = `Your code is: ${response.data.id}`;
}

btnShowBin.onclick = async (event) => {
    const id = document.getElementById("code");
    const response = await axios.get("/get", {params: {id: id.value}});
    document.getElementById("codeResults").innerHTML = response.data;
}
