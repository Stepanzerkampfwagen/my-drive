import api from '@/api/api'

// export async function getFiles() {
//     const res = await api.get(`/files`)
//     return res.data
// }
//
// export async function uploadFile(file: File) {
//     const formData = new FormData()
//     formData.append('file', file)
//     const res = await api.post(`/file`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//     })
//     return res.data
// }
//
// export async function deleteFile(fileId: number) {
//     const res = await api.delete(`/files/${fileId}`)
//     return res.data
// }
//
// export async function downloadFile(fileId: number) {
//     const res = await api.get(`/files/${fileId}`, { responseType: 'blob' })
//     const url = window.URL.createObjectURL(res.data)
//     const link = document.createElement('a')
//     link.href = url
//     link.setAttribute('download', 'file')
//     document.body.appendChild(link)
//     link.click()
//     link.remove()
// }

export async function uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await api.post('/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data
}

export async function getFiles() {
    const res = await api.get('/files')
    return res.data
}

export async function deleteFile(id: number) {
    const res = await api.delete(`/files/${id}`)
    return res.data
}
