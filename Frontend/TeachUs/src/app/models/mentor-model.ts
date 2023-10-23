export interface MentorModel {
    username: string,
    email: string,
    phoneNumber: string,
    passwordHash: string,
    createdAt: Date,
    isActive: boolean,
    isDeleted: boolean,
    bio: string,
    educationalInstitution: string,
    subject: Array<string>,
    reviewStatus: string,
    city: string,
    county: string,
    addressInfo: string,
    numberOfStars?: number,
    price: Array<number>
    link?: string
}
