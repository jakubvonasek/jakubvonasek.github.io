class PostIt {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.uploadArea = document.getElementById('uploadArea');
        this.imageInput = document.getElementById('imageInput');
        this.gradientSelector = document.getElementById('gradientSelector');
        this.previewArea = document.getElementById('previewArea');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.newImageBtn = document.getElementById('newImageBtn');
        
        this.originalImage = null;
        this.selectedGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        this.init();
    }
    
    init() {
        this.uploadArea.addEventListener('click', () => this.imageInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        
        this.imageInput.addEventListener('change', this.handleImageUpload.bind(this));
        
        document.querySelectorAll('.gradient-option').forEach(option => {
            option.addEventListener('click', this.selectGradient.bind(this));
        });
        
        this.downloadBtn.addEventListener('click', this.downloadImage.bind(this));
        this.newImageBtn.addEventListener('click', this.resetApp.bind(this));
        
        document.querySelector('.gradient-option').classList.add('selected');
    }
    
    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            this.processImage(files[0]);
        }
    }
    
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processImage(file);
        }
    }
    
    processImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.showGradientSelector();
                this.generatePreview();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    showGradientSelector() {
        this.gradientSelector.style.display = 'block';
    }
    
    selectGradient(e) {
        document.querySelectorAll('.gradient-option').forEach(option => {
            option.classList.remove('selected');
        });
        e.target.classList.add('selected');
        
        this.selectedGradient = e.target.dataset.gradient;
        this.generatePreview();
    }
    
    generatePreview() {
        if (!this.originalImage) return;
        
        const padding = 60;
        const canvasWidth = this.originalImage.width + (padding * 2);
        const canvasHeight = this.originalImage.height + (padding * 2);
        
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        
        this.drawGradientBackground();
        
        const x = padding;
        const y = padding;
        this.ctx.drawImage(this.originalImage, x, y);
        
        this.previewArea.style.display = 'block';
    }
    
    drawGradientBackground() {
        const gradient = this.parseGradient(this.selectedGradient);
        const canvasGradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        
        gradient.stops.forEach(stop => {
            canvasGradient.addColorStop(stop.position, stop.color);
        });
        
        this.ctx.fillStyle = canvasGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    parseGradient(gradientString) {
        const regex = /linear-gradient\(135deg,\s*(.+)\)/;
        const match = gradientString.match(regex);
        
        if (!match) return { stops: [{ position: 0, color: '#667eea' }, { position: 1, color: '#764ba2' }] };
        
        const stops = match[1].split(',').map(stop => {
            const parts = stop.trim().split(' ');
            const color = parts[0];
            const position = parts[1] ? parseInt(parts[1]) / 100 : 0;
            return { color, position };
        });
        
        return { stops };
    }
    
    downloadImage() {
        const link = document.createElement('a');
        link.download = 'postit-image.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
    
    resetApp() {
        this.originalImage = null;
        this.gradientSelector.style.display = 'none';
        this.previewArea.style.display = 'none';
        this.imageInput.value = '';
        
        document.querySelectorAll('.gradient-option').forEach(option => {
            option.classList.remove('selected');
        });
        document.querySelector('.gradient-option').classList.add('selected');
        this.selectedGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PostIt();
});