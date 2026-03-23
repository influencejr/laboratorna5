export class Course {
    constructor(id, title, capacity, enrolledCount = 0) {
        this.id = id;
        this.title = title;
        this.capacity = capacity;
        this.enrolledCount = enrolledCount;
    }

    hasAvailableSlots() {
        return this.enrolledCount < this.capacity;
    }

    incrementEnrollment() {
        if (!this.hasAvailableSlots()) {
            throw new Error("No available slots in this course");
        }
        this.enrolledCount++;
    }
}