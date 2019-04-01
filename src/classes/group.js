export default class GroupTemplate {
    constructor (username) {
        this.candidates_count = 0
        this.GroupName = '',
        this.Created = Date.now().toString()
        this.SearchParams = ''
        this.MessageTemplate =
`Здравствуйте $CandidateName!
Я рекрутёр $UserName.
Ищу специалиста для работы в $Owner на должности $Position.
Прошу принять моё приглашение. С уважением, $UserName.`,
        this.Circles = '1,2'
        this.Owner = username
        this.Employer = ''
        this.Position = ''
        this.Skills = ''
        this.Location = ''
        this.Title = ''
        this.Exceptions = 'HR, Директор, Manager, CEO'
        this.Visible = 'true'
    }
}
