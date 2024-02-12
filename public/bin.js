const btnNewBin = document.getElementById("btnNewBin");
const btnShowBin = document.getElementById("btnShowBin");
const btnCopyBin = document.getElementById("btnCopyBin");
const binNewContent = document.getElementById("binNewContent");
const binContents = document.getElementById("binContents");
const newBinCode = document.getElementById("newBinCode");
const codeId = document.getElementById("code");
const binResults = document.getElementById("binResults");

btnNewBin.onclick = async (event) => {
	try {
		const response = await axios.post("/new", { bin: binNewContent.value });
		newBinCode.innerHTML = `Your code is: ${response.data.id}`;
	} catch (err) {
		console.log(err);
		newBinCode.innerHTML = `Error: ${err.response.data}`;
	}
};

btnClearBin.onclick = async (event) => {
	try {
		binNewContent.value = "";
	} catch (err) {
		console.log(err);
	}
};


btnCopyBin.onclick = async (event) => {
	const textToCopy = binContents.innerText;
	try {
	  await navigator.clipboard.writeText(textToCopy);
	} catch (err) {
	  console.error('Failed to copy text', err);
	}
};

btnShowBin.onclick = async (event) => {
	binResults.classList.toggle('hidden');
	try {
		const response = await axios.get("/get", { params: { id: codeId.value } });
		binContents.innerHTML = response.data;
	} catch (err) {
		console.log(err);
		binContents.innerHTML = err.response.data;
	}
};
