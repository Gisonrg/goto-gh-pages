(() => {
    let shouldRender = () => {
        let paths = window.location.pathname.split('/');
        if (paths.length < 3 || paths[2].length === 0) {
            return false;
        }
        let hasRepoHeader = document.querySelector('.repohead-details-container') !== null;
        return hasRepoHeader;
    };

    let createImgNode = () => {
        const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACgUlEQVQ4ja2Uv2sUcRDFP++7K/5ALEWjIghqjGgVItiJjSiRGNTCUvS2VIOFEZFAMGdhavFUsFFsjCSC2uUPMCAWl1NRUJQktQhRsrvPYjeXeIm/wIGF4X3nvRlmdkYsZwPjcTS94SjQK7vLsBFAMG38AoeRbNPMKAMH0laqWoEoaXTLvmHYsWyyBeJbSxezW7ueLMbDgmvFlXoVe6wQ82fgY0l/DjwrAz8Anww7sMfipD4E1hLBuDI5ZHQJmBMMZmm0D1gPpFme9mVRuADMAeuz2F2Gq8A3W/1xMnntJ8EoaXSXYmBV0lrH1RDlPcBqxBPu7Glws/0NeAxYE1Idy2sdgyIcBmZt9UdJo7sQHBiPZd8o+qKh7Paue2WTzpRJ7yx0hbuldwYgrbWPG18CkD1MZWKFoqTRi/3odwP4e/PJAPT+HzEAeoLsLgBJ+7Nah7Jah7COlwEP57H5T3gYwPhcE8/DNgChzjD/06Yxb5t5Qr4OQPZUawm5mSndtU1w886PwHdDW2gl/NGklb97DoJpgDhdtBl5+AJgqW2JnptxX5vg5zdbgZWCKUWV+n3QqX+udFnzg4DDyP8RA8xoyDbNjIpiIDbn5ydneFkE+XBz+uIIgPDrRXEXSrl3mWYfBwYOpJYuAkhcj5P6wTJbuSHh9KIKzpbYCECc1A8KqhTkPmqdc80rEVfq1XKfv9mq5vLtCN4DcRaFPeRZFFmvALI82xsUn5DcD6ySXE1v7b5cVL+QXnEyec1Wfwl8AnJgK+YpUgAfKs6aDGwpBDSU1tqvlNgvD+ywYfsfRvAOqa/1wC4RBKAysSJidQ/QI9RpaCuDp4wnMKOZZh9T65xrpf4AtPkS0b5/QdcAAAAASUVORK5CYII=';
        const iconImg = document.createElement('img');
        iconImg.setAttribute('src', icon);
        return iconImg;
    };

    let createGotoNode = () => {
        let gotoNode = document.createElement('a');
        let paths = window.location.pathname.split('/');
        let actorName = paths[1];
        let repoName = paths[2];
        let pageUrl = `https://${actorName}.github.io/${repoName}`;
        gotoNode.setAttribute('href', pageUrl);
        gotoNode.setAttribute('title', 'Go to the Github Page for this repo.');
        gotoNode.setAttribute('target', '_blank');
        gotoNode.setAttribute('style', 'margin: 0 4px;');
        gotoNode.appendChild(createImgNode());
        return gotoNode;
    };

    let addGotoButtonNode = () => {
        let container = document.querySelector('.repohead-details-container > .public');
        let repoNameNode = container.querySelector('strong[itemprop=name]');
        if (container.lastChild == repoNameNode) {
            container.appendChild(createGotoNode());
        } else {
            container.insertBefore(createGotoNode(), repoNameNode.nextSibling);
        }
    };

    // Ensure we are in repo page.
    if (!shouldRender) {
        return;
    }

    // Check the repo branch list to decide if we want to add the button.
    let branches = document.querySelectorAll('.branch-select-menu .select-menu-list[data-tab-filter="branches"] a.select-menu-item');
    for (let branch of branches) {
        // TODO: allow show the icon even if gh-pages branch not present.
        if (branch.getAttribute('data-name') === 'gh-pages') {
            addGotoButtonNode();
        }
    }
})();