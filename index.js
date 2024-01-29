let type = 'link'

async function uploadToImgbb(imageFile) {
    const formData = new FormData()
    formData.append('image', imageFile)

    try {
        const response = await fetch(
            'https://api.imgbb.com/1/upload?key=b12e4aae6129f86de8d9f844d7556f9b',
            {
                method: 'POST',
                body: formData,
            }
        )

        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse.data.url
        } else {
            console.error(
                'Erro ao fazer upload da imagem:',
                response.status,
                response.statusText
            )
            return null
        }
    } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error)
        return null
    }
}

function uploadImage() {
    const imageFile = document.getElementById('imageFile').files[0]
    uploadToImgbb(imageFile).then((url) => {
        if (url) {
            createQRCode(url)
            alert('Imagem enviada com sucesso! URL: ' + url)
        } else {
            alert('Falha ao enviar imagem.')
        }
    })
}

function changeQRCodeType(newType) {
    type = newType
    document.getElementById(`qrcode-${newType}`).click()
    document.querySelector(`#qrcode-${newType} button`).click()
    document.getElementById(`type-${newType}`).style.display = 'block'
    document.getElementById(
        `type-${newType === 'link' ? 'image' : 'link'}`
    ).style.display = 'none'
    document.getElementById(`btn-qrcode-${newType}`).style.display = 'block'
    document.getElementById(
        `btn-qrcode-${newType === 'link' ? 'image' : 'link'}`
    ).style.display = 'none'
}

function createQRCode(link) {
    document.getElementById('qrcode').innerHTML = ''
    new QRCode(document.getElementById('qrcode'), {
        text: link,
        width: 128,
        height: 128,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
    })
}

changeQRCodeType(type)
