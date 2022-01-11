import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const application = express()

application.use(bodyParser.text())
application.use(express.json())
application.use(express.urlencoded({ extended: false }))
application.use(cors())

application.set('port', process.env.APPLICATION_PORT || 5000)

application.get('/', (_, response) => {
  response.send('Hi')
})

export { application }
