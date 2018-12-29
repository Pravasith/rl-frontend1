export default function(imageURL){
    let publicId = imageURL.split("/")[7].split(".")[0]
    // console.log(publicId)
    return publicId
}