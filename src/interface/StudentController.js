export class StudentController {
    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }

    async handleRegistration(req, res) {
        try {
            const { courseId, studentId } = req.body;
            const result = await this.registerUseCase.execute(courseId, studentId);
            res.status(200).json(result);
        } catch (error) {
                res.status(400).json({ error: error.message });
            }
        }
}