import mongoose, { Schema,model,models } from "mongoose";
import bcrypt from "bcryptjs";


export const VIDEO_DIMENSIONS = {
    width: 1920,
    height: 1080 
} as const

export interface IVideo{
    _id?: mongoose.Types.ObjectId
    title: string
    description: string
    videoUrl: string
    thumbnailUrl: string
    controls?: boolean
    transformations?: {
        height: number
        width: number
        quality?: number
    }
    createdAt?: Date
    updatedAt?: Date
}


const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    transformations: {
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width
        },
        quality: {
            type: Number,
            min: 1,
            max: 100
        }
    }
}, {
    timestamps: true
})                
export const Video = models?.Video || model<IVideo>("Video", videoSchema)

export default Video