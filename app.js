const Dictionaryinput=document.querySelector('.Dictionary__input')
const SubmitBtn=document.querySelector('.Submit')
const WordElem=document.querySelector('.Dictionary__word')
const Speack_icon=document.getElementById('bi')
const IconContainer=document.querySelector('.icon')
const Dictionarycheck=document.querySelector('.Dictionary__check')
const Dictionaryinfo=document.querySelector('.Dictionary__info')
const InfoBox=document.getElementById('Dictionary-infobox')
const AudioElem=document.querySelector('.voice')

let mp3FileObj
let Mp3File
let ExampleObj
let Example

SubmitBtn.addEventListener('click',()=>{
    Dictionaryinfo.innerHTML=""
    InfoBox.style.display="block"
    let Word=Dictionaryinput.value
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${Word}`)
    .then(res=>{
        return res.json()
    }).then(data=>{
        SetWord(data)
        SetExample(data)
        Speack_icon.style.display="block"
    }).catch(err=>{
        alert("not Find Word")
        InfoBox.style.display="none"
        Speack_icon.style.display="none"
        })
})

function SetWord(data){
    data.forEach(item => {
        WordElem.innerHTML=item.word
        Dictionarycheck.innerHTML=item.phonetic
        mp3FileObj=item.phonetics
    });
    mp3FileObj.forEach((item)=>{
        Mp3File=item.audio;
    })

}
function SetExample(data){
    for(let item of data){
        ExampleObj=item.meanings;
    }
    ExampleObj.forEach((item)=>{
        Example=item.definitions
    })
    for(let item of Example){
       Dictionaryinfo.innerHTML+=item.definition
    }
}
Speack_icon.addEventListener('click',()=>{
 AudioElem.src=Mp3File
})
