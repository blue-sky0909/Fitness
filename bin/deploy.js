import Aws from 'aws-sdk'
import Mime from 'mime'
import fs from 'fs'
import Async from 'async'
import path from 'path'
import logger from '../build/lib/logger'
const env = process.env.NODE_ENV || 'local'
const appConfig = require(`../src/config/index.js`).default

function deploy () {
  const s3Bucket = initClient()
  const filesToUpload = getFiles()

  logger.info(`${filesToUpload.length} files found`)

  emptyBucket(s3Bucket)
    .then(() => uploadFiles(s3Bucket, filesToUpload))
    .catch((err) => logger.error(err))
}

function emptyBucket (s3Bucket) {
  const params = {
    Bucket: appConfig.bucketName
  }
  logger.info(`removing files from ${appConfig.bucketName}`)

  const removeFiles = (resolve, reject) => {
    s3Bucket.listObjects(params, (err, data) => {
      if (err) return reject(err)

      if (data.Contents.length === 0) resolve()

      params.Delete = { Objects: [] }

      data.Contents.forEach(function (content) {
        params.Delete.Objects.push({ Key: content.Key })
      })

      s3Bucket.deleteObjects(params, function (err, data) {
        if (err) return reject(err)
        if (data.Deleted.length === 1000) removeFiles(resolve, reject)
        else resolve()
      })
    })
  }

  return new Promise(removeFiles)
}

function uploadFiles (s3Bucket, filesToUpload) {
  Async.mapLimit(filesToUpload, 5, function (file, mapCallback) {
    var uploadParams = {
      ACL: 'public-read',
      Body: fs.readFileSync(file),
      Bucket: appConfig.bucketName,
      Key: file.replace(path.resolve(__dirname, '../dist/'), '').substr(1),
      ContentType: Mime.lookup(file)
    }

    s3Bucket.upload(uploadParams, function (error, response) {
      if (error) error('ERROR UPLOADING FILE: ', error)
      logger.info(`file uploaded ${file}`)
      mapCallback()
    })
  }, function (error, data) {
    if (error) {
      logger.error('MAP ERROR: ', error)
    } else {
      logger.success('deployment completed')
    }
  })
}

function getFiles () {
  logger.info('reading files from dist')
  return getFilesAt(path.resolve(__dirname, '../dist'))
}

function getFilesAt (filePath) {
  let stats
  try {
    stats = fs.statSync(filePath)
  } catch (err) {
    logger.error(`can't get file stats. path: ${filePath} error: ${err}`)
    throw new Error()
  }

  if (!stats) {
    logger.error(`can't get file stats. path: ${filePath}`)
    throw new Error()
  }

  if (stats.isDirectory()) {
    return processDirectory(filePath)
  } else {
    return [filePath]
  }
}

function processDirectory (directoryPath) {
  const directoryFiles = fs.readdirSync(directoryPath)

  const filePaths = directoryFiles.map(filePath => path.join(directoryPath, filePath))
  const results = filePaths.reduce((memo, filePath) => {
    return memo.concat(getFilesAt(filePath))
  }, [])
  return results
}

function initClient () {
  Aws.config.loadFromPath(path.resolve(__dirname, '../aws-credentials.json'))
  return new Aws.S3({ params: { Bucket: appConfig.bucketName } })
}

deploy()
