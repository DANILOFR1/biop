from PIL import Image, ImageDraw

def create_icon(size):
    # Criar uma nova imagem com fundo transparente
    image = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    
    # Desenhar círculo verde de fundo
    margin = size * 0.05  # 5% de margem
    circle_size = size - (2 * margin)
    draw.ellipse(
        [(margin, margin), (margin + circle_size, margin + circle_size)],
        fill='#4CAF50'
    )
    
    # Calcular dimensões para o ícone da flor
    center_x = size / 2
    center_y = size / 2
    flower_size = circle_size * 0.6
    
    # Desenhar círculo da flor
    flower_margin = (size - flower_size) / 2
    draw.ellipse(
        [(flower_margin, flower_margin), 
         (flower_margin + flower_size, flower_margin + flower_size)],
        outline='white',
        width=int(size * 0.05)
    )
    
    # Desenhar folhas
    leaf_size = flower_size * 0.8
    leaf_y = center_y + (flower_size * 0.3)
    leaf_points = [
        (center_x, leaf_y),  # Ponto central superior
        (center_x - leaf_size/2, leaf_y + leaf_size/2),  # Ponto esquerdo
        (center_x, leaf_y + leaf_size/2),  # Ponto central inferior
        (center_x + leaf_size/2, leaf_y + leaf_size/2),  # Ponto direito
    ]
    draw.polygon(leaf_points, fill='white')
    
    # Salvar o ícone
    filename = f'icons/icon-{size}x{size}.png'
    image.save(filename, 'PNG')
    print(f'Created {filename}')

# Gerar ícones nos tamanhos necessários
for size in [192, 512]:
    create_icon(size) 