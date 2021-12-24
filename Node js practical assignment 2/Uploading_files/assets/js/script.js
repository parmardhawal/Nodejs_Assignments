const preview = document.querySelector("#preview");
const images = document.querySelector("#images");

images.addEventListener("change",()=>{
    var files = document.querySelector("#images").files;
 
    if(files)
    {
        Array.from(files).forEach((file)=>{

            if(/\.(jpe?g|png)$/i.test(file.name))
            {
                var reader = new FileReader();
                reader.addEventListener("load",()=>{
                    
                    var attributes = {
                        src : reader.result,
                        height : 100,
                        width : 100,
                        style:"margin:5px;"
                    };

                    var img = document.createElement("img");
                    setAttributes(img,attributes);
                    preview.appendChild(img);

                },false);
                reader.readAsDataURL(file);
            }
        });
    }
});

function setAttributes(element,attributes)
{
    for(key in attributes)
    {
        element.setAttribute(key,attributes[key]);
    }
}