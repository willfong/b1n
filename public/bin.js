const btnNewBin = document.getElementById("btnNewBin");
const btnShowBin = document.getElementById("btnShowBin");
const binContents = document.getElementById("binContents");
const newBinCode = document.getElementById("newBinCode");

btnNewBin.onclick = async (event) => {
    const response = await axios.post("/new", {bin: binContents.value});
    newBinCode.innerHTML = response.data.id; 
}
