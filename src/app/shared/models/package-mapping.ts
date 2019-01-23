export function FestPackageFactory(pack) {
  switch (pack) {
    case 'cultural-events':
      return new FestPackage('fa-paint-brush', 'Cultural Events', 'cultural-events', '#1e3c21');
    case 'hackathon':
    return new FestPackage('fa-desktop', 'Hackathon', 'hackathon', '#a79f58');
    case 'parliamentary-debate':
    return new FestPackage('fa-users', 'Parliamentary Debate', 'parliamentary-debate', '#6f5224');
    case 'pratibimb':
    return new FestPackage('fa-universal-access', 'Pratibimb', 'pratibimb', '#a04943');
    case 'robowars':
    return new FestPackage('fa-android', 'Robowars', 'robowars', '#39463a');
    case 'technical-cultural-combo':
    return new FestPackage('fa-empire', 'Technical Cultural Combo', 'technical-cultural-combo', '#613b88');
    case 'technical-events':
    return new FestPackage('fa-cog', 'Technical Events', 'technical-events', '#5a2525');
  }
}

export class FestPackage {
  constructor(public icon = '', public name = '', public id = '', public background = '') {

  }
  get class() {
    return {
      [this.icon]: true,
      'fa': true,
      'fa-2x': true
    };
  }
}
