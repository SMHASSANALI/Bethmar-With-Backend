const HeroSectionModel = require('../modals/HeroSection.schema')
const UserModel = require('../modals/User.schema')
const { uploadToCloudinary } = require('../utils/cloudinary')

// GET: Fetch HomePage Content
const getHomePage = async (req, res) => {
  try {
    const homePage = await HeroSectionModel.findOne()
    return res.status(200).json({
      success: true,
      message: 'Home Page Fetched Successfully',
      data: homePage
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

// CREATE: HomePage (Only One Document)
const createHomePage = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
    if (!user)
      return res.status(401).json({ success: false, message: 'Unauthorized' })

    const body = req.body
    const files = req.files

    body.description = JSON.parse(body.description || '[]')
    body.clients = JSON.parse(body.clients || '[]')
    body.services = JSON.parse(body.services || '{}')
    const aboutList = JSON.parse(body.about || '[]')

    if (files?.heroImage?.[0]) {
      body.image = await uploadToCloudinary(files.heroImage[0].path, 'home')
    }

    const aboutWithFiles = []
    for (let i = 0; i < aboutList.length; i++) {
      const current = aboutList[i]
      const aboutImg = files?.aboutImages?.[i]
      const aboutSvg = files?.aboutSvgs?.[i]

      const imageUrl = aboutImg
        ? await uploadToCloudinary(aboutImg.path, 'about')
        : ''
      const SVG = aboutSvg
        ? await uploadToCloudinary(aboutSvg.path, 'about')
        : ''

      aboutWithFiles.push({
        heading: current.heading || '',
        description: current.description || '',
        imageUrl,
        SVG
      })
    }

    const newHome = await HeroSectionModel.create({
      description: body.description,
      image: body.image,
      clients: body.clients,
      services: body.services,
      about: aboutWithFiles
    })

    return res.status(200).json({
      success: true,
      message: 'Home Page Created Successfully',
      data: newHome
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

// UPDATE
const updateHomePage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const body = req.body
    const files = req.files

    body.description = JSON.parse(body.description || '[]')
    body.clients = JSON.parse(body.clients || '[]')
    body.services = JSON.parse(body.services || '{}')
    const aboutList = JSON.parse(body.about || '[]')

    if (files?.heroImage?.[0]) {
      body.image = await uploadToCloudinary(files.heroImage[0].path, 'home')
    }

    const aboutWithFiles = []
    for (let i = 0; i < aboutList.length; i++) {
      const current = aboutList[i]
      const aboutImg = files?.aboutImages?.[i]
      const aboutSvg = files?.aboutSvgs?.[i]

      const imageUrl = aboutImg
        ? await uploadToCloudinary(aboutImg.path, 'about')
        : current.imageUrl || '' // ✅ Preserve existing URL if no new file

      const SVG = aboutSvg
        ? await uploadToCloudinary(aboutSvg.path, 'about')
        : current.SVG || '' // ✅ Preserve existing URL if no new file

      aboutWithFiles.push({
        heading: current.heading || '',
        description: current.description || '',
        imageUrl,
        SVG
      })
    }
    const updateFields = {
      ...(body.description && { description: body.description }),
      ...(body.clients && { clients: body.clients }),
      ...(body.services && { services: body.services }),
      ...(body.image && { image: body.image }),
      ...(aboutWithFiles.length && { about: aboutWithFiles })
    }
    const updated = await HeroSectionModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    )

    return res.status(200).json({
      success: true,
      message: 'Home Page Updated Successfully',
      data: updated
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

// DELETE
const deleteHomePage = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    const deleted = await HeroSectionModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({
      success: true,
      message: 'Home Page Deleted Successfully',
      data: deleted
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    })
  }
}

module.exports = {
  getHomePage,
  createHomePage,
  updateHomePage,
  deleteHomePage
}
