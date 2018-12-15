'use strict';

module.exports = Destiny => {
  Destiny.afterRemote('find', (ctx, destiny, next) => {
    const Company = Destiny.app.models.company;

    destiny.forEach((v, index) => {
      Company.findById(v.companyId, (err, company) => {
        v.company = company;
        if (index === destiny.length - 1) {
          next();
        }
      });
    });
  });

  Destiny.afterRemote('findById', (ctx, destiny, next) => {
    const Company = Destiny.app.models.company;

    Company.findById(destiny.companyId, (err, company) => {
      destiny.company = company;
      next();
    });
  });
};
